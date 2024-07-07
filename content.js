let filterOptions = {
  titleChecked: true,
  descriptionChecked: true,
  badgesChecked: true,
};

function loadOptions() {
  chrome.storage.sync.get(
    {
      titleChecked: true,
      descriptionChecked: true,
      badgesChecked: true,
    },
    (items) => {
      filterOptions = items;
      hideAIProducts();
    }
  );
}

function hideAIProducts() {
  const productItems = document.querySelectorAll('[class^="styles_item__"]');

  productItems.forEach((item) => {
    let shouldHide = false;
    const titleContainer = item.querySelector(
      '[class^="styles_titleContainer__"]'
    );
    if (titleContainer) {
      const titleElement = titleContainer.querySelector("strong");
      const descriptionElement = titleContainer.querySelector("span");

      const title = titleElement?.innerText.toLowerCase() || "";
      const description =
        descriptionElement?.parentNode?.innerText
          ?.split("—")[1]
          ?.toLowerCase() || "";

      if (filterOptions.titleChecked && title.includes("ai")) {
        shouldHide = true;
      }

      if (filterOptions.descriptionChecked && description.includes("ai")) {
        shouldHide = true;
      }
    }
    const extraInfoContainer = item.querySelector(
      '[class^="styles_extraInfo__"]'
    );
    if (extraInfoContainer) {
      const badges = extraInfoContainer.querySelectorAll("a");
      badges.forEach((badge) => {
        if (
          filterOptions.badgesChecked &&
          badge.innerText.toLowerCase().includes("artificial intelligence")
        ) {
          shouldHide = true;
        }
      });
    }
    if (shouldHide) {
      item.style.display = "none";
    }
  });
}

const observer = new MutationObserver((mutations) => {
  hideAIProducts();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
loadOptions();
