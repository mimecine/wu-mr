// Put your application javascript here
window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(`nav a[href$='${location.pathname + location.search}']`)
    .forEach((el) => {
      el.parentNode.classList.add("link-current");
    });
});

document.addEventListener("alpine:init", () => {
  Alpine.directive(
    "mintersect",
    (el, { expression, modifiers }, { evaluateLater, cleanup }) => {
      let evaluate = evaluateLater(expression);
      let options = {
        rootMargin: "-30% 0px",
      };
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            modifiers.includes("in") &&
            entry.intersectionRatio >= 0.5 &&
            !entry._i
          ) {
            entry._i = true;
            evaluate();
          } else if (
            modifiers.includes("out") &&
            entry.intersectionRatio < 0.5
          ) {
            entry._i = false;
            evaluate();
          } else {
            //    if (entry.intersectionRatio === 0) return
            //    evaluate()
          }
          modifiers.includes("once") && observer.disconnect();
        });
      }, options);

      observer.observe(el);

      cleanup(() => {
        observer.disconnect();
      });
    }
  );

  Alpine.store("Cart", {
    state: { item_count: "  " },
    items: [],
    isLoading: false,
    async addItemFromForm(form) {
      this.isLoading = true;
      try {
        await Shopify.theme.cart.addItemFromForm(form);
      } catch (e) {
        this.isLoading = false;
        return false;
      }
      this.init();
    },
    async addItem(id) {
      this.isLoading = true;
      await Shopify.theme.cart.addItem(id);
      this.init();
    },
    async setQuantity(key, quantity) {
      this.isLoading = true;
      try {
        this.init(await Shopify.theme.cart.updateItem(key, { quantity }));
      } catch (e) {
        this.isLoading = false;
        return false;
      }
    },
    async removeItem(key) {
      this.isLoading = true;
      this.init(await Shopify.theme.cart.removeItem(key));
    },
    async init(state) {
      this.isLoading = true;
      this.state = state || (await Shopify.theme.cart.getState());

      for (var item of this.state.items) {
        product = await getProductJson(item.handle);
        let img = product.media.find((m) => {
          return m.src.indexOf("_illustration.") != -1;
        });
        if (img) {
          item.image = img.src;
        }
      }

      this.items = this.state.items;
      this.isLoading = false;
    },
  });
});

async function getProductJson(handle) {
  res = await fetch("/products/" + handle + ".js");
  return await res.json();
}

function cartDrawer() {
  return {
    open: false,
    usedKeyboard: false,

    async init() {
      this.$watch("open", (value) => {
        value && this.$refs.closeButton.focus();
        this.toggleOverlay();
      });
      this.toggleOverlay();
    },
    toggleOverlay() {
      document.body.classList[this.open ? "add" : "remove"](
        "h-screen",
        "overflow-hidden"
      );
    },
  };
}

function sizeModal() {
  return {
    open: false,
    size: false,
    care: false,
    usedKeyboard: false,
    init() {
      this.$watch("open", (value) => {
        //value && this.$refs.closeButton.focus()
        this.toggleOverlay();
      });
      this.toggleOverlay();
    },
    toggleOverlay() {
      document.body.classList[this.open ? "add" : "remove"](
        "h-screen",
        "overflow-hidden"
      );
    },
  };
}

function usd(cents) {
  return (
    "$" +
    String(cents)
      .replace(/(\d\d$)/, ".$1")
      .replace(/\.00$/, "")
  );
}
