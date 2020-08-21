export class halfmoon {
  // Getting the required elements
  // Re-initialized once the DOM is loaded (to avoid issues with virtual DOM)
  static pageWrapper? = document.getElementsByClassName("page-wrapper")[0];
  static stickyAlerts? = document.getElementsByClassName("sticky-alerts")[0];

  static darkModeOn: "yes" | "no" = "no"; // Also re-initialized once the DOM is loaded (see below)

  // Create cookie
  static createCookie(name: string, value: string, days?: number) {
    let expires;
    if (days !== undefined) {
      let date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  // Read cookie
  static readCookie(name: string) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(";").map((cookie) => cookie.trimLeft());
    for (const cookie of cookies) {
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }

  // Erase cookie
  static eraseCookie(name: any) {
    this.createCookie(name, "", -1);
  }

  // Toggle light/dark mode
  static toggleDarkMode() {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      this.darkModeOn = "no";
    } else {
      document.body.classList.add("dark-mode");
      this.darkModeOn = "yes";
    }
    this.createCookie("darkModeOn", this.darkModeOn, 365);
  }

  // Toggles sidebar
  static toggleSidebar() {
    if (this.pageWrapper) {
      if (this.pageWrapper.getAttribute("data-sidebar-hidden")) {
        this.pageWrapper.removeAttribute("data-sidebar-hidden");
      } else {
        this.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
      }
    }
  }

  // Deactivate all the dropdown toggles when another one is active
  static deactivateAllDropdownToggles() {
    let activeDropdownToggles = document.querySelectorAll(
      "[data-toggle='dropdown'].active"
    );
    for (const activeDropdownToggle of activeDropdownToggles) {
      activeDropdownToggle.classList.remove("active");
      activeDropdownToggle.closest(".dropdown")?.classList.remove("show");
    }
  }

  // Toggle modal (using Javascript)
  static toggleModal(modalId: string) {
    document.getElementById(modalId)?.classList.toggle("show");
  }

  /* Code block for handling sticky alerts */

  // Make an ID for an element
  static makeId(length: number) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Toast an alert (show, fade, dispose)
  static toastAlert(alertId: string, timeShown: number = 5000) {
    let alertElement = document.getElementById(alertId)!;

    // Alert is only toasted if it does not have the .show class
    if (!alertElement.classList.contains("show")) {
      // Add .alert-block class if it does not exist
      if (!alertElement.classList.contains("alert-block")) {
        alertElement.classList.add("alert-block");
      }

      // Show the alert
      // The 0.25 seconds delay is for the animation
      setTimeout(function () {
        alertElement.classList.add("show");
      }, 250);

      // Wait some time (timeShown + 250) and fade out the alert
      let timeToFade = timeShown + 250;
      setTimeout(function () {
        alertElement.classList.add("fade");
      }, timeToFade);

      // Wait some more time (timeToFade + 500) and dispose the alert (by removing the .alert-block class)
      // Again, the extra delay is for the animation
      // Remove the .show and .fade classes (so the alert can be toasted again)
      let timeToDestroy = timeToFade + 500;
      setTimeout(() => {
        alertElement.classList.remove("alert-block");
        alertElement.classList.remove("show");
        alertElement.classList.remove("fade");
      }, timeToDestroy);
    }
  }

  // Create a sticky alert, display it, and then remove it
  static initStickyAlert(param: {
    content?: string;
    title?: string;
    alertType?: string;
    fillType?: string;
    hasDismissButton?: boolean;
    timeShown?: number;
  }) {
    // Setting the letiables from the param
    let content = param.content ?? "";
    let title = param.title ?? "";
    let alertType = param.alertType ?? "";
    let fillType = param.fillType ?? "";
    let hasDismissButton = param.hasDismissButton ?? true;
    let timeShown = param.timeShown ?? 5000;

    // Create the alert element
    let alertElement = document.createElement("div");

    // Set ID to the alert element
    alertElement.setAttribute("id", this.makeId(6));

    // Add the title
    if (title) {
      content = "<h4 class='alert-heading'>" + title + "</h4>" + content;
    }

    // Add the classes to the alert element
    alertElement.classList.add("alert");
    alertElement.classList.add(alertType);
    alertElement.classList.add(fillType);

    // Add the close button to the content (if required)
    if (hasDismissButton) {
      content =
        "<button class='close' data-dismiss='alert' type='button' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        content;
    }

    // Add the content to the alert element
    alertElement.innerHTML = content;

    // Append the alert element to the sticky alerts
    this.stickyAlerts?.insertBefore(
      alertElement,
      this.stickyAlerts.childNodes[0] ?? null
    );

    // Toast the alert
    this.toastAlert(alertElement.getAttribute("id")!, timeShown);
  }

  /* End code block for handling sticky alerts */

  // Click handler that can be overridden by users if needed
  static clickHandler: (event: any) => void;

  // Keydown handler that can be overridden by users if needed
  static keydownHandler: (event: any) => void;
}

/* Things done once the DOM is loaded */

function HalfMoonOnDOMContentLoaded() {
  // Re-initializing the required elements (to avoid issues with virtual DOM)
  if (halfmoon.pageWrapper === undefined) {
    halfmoon.pageWrapper = document.getElementsByClassName("page-wrapper")[0];
  }
  if (halfmoon.stickyAlerts === undefined) {
    halfmoon.stickyAlerts = document.getElementsByClassName("sticky-alerts")[0];
  }

  // Handle the cookie and letiable for dark mode
  // 1. First preference is given to the cookie if it exists
  if (halfmoon.readCookie("darkModeOn")) {
    halfmoon.darkModeOn =
      (halfmoon.readCookie("darkModeOn") as "yes" | "no" | null) ?? "no";
  } else {
    // 2. If cookie does not exist, next preference is for the dark mode setting
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      halfmoon.darkModeOn = "yes";
    } else {
      // 3. If all else fails, re-initialize the dark mode preference depending on the .dark-mode class
      if (document.body.classList.contains("dark-mode")) {
        halfmoon.darkModeOn = "yes";
      } else {
        halfmoon.darkModeOn = "no";
      }
    }
    // 4. Set the cookie where the letiable is the value
    halfmoon.createCookie("darkModeOn", halfmoon.darkModeOn, 365);
  }

  // Automatically set preferred theme
  // But only if the data-attribute is provided
  if (document.body.getAttribute("data-set-preferred-theme-onload")) {
    if (halfmoon.darkModeOn == "yes") {
      if (!document.body.classList.contains("dark-mode")) {
        document.body.classList.add("dark-mode");
      }
    } else {
      if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
      }
    }
  }

  // Hiding sidebar on first load on small screens (unless data-attribute provided)
  // Or on larger screens when sidebar type is overlayed-all
  if (document.documentElement.clientWidth <= 768) {
    if (halfmoon.pageWrapper) {
      if (
        !halfmoon.pageWrapper.getAttribute(
          "data-show-sidebar-onload-sm-and-down"
        )
      ) {
        halfmoon.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
      }
    }
  } else {
    if (halfmoon.pageWrapper) {
      if (
        halfmoon.pageWrapper.getAttribute("data-sidebar-type") ===
        "overlayed-all"
      ) {
        halfmoon.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
      }
    }
  }

  // Adding the click event listener
  document.addEventListener(
    "click",
    function (event) {
      let eventCopy = event;
      let target: Element | null = event.target as Element;

      // Handle clicks on dropdown toggles
      if (
        target !== null &&
        (target.matches("[data-toggle='dropdown']") ||
          target.matches("[data-toggle='dropdown'] *"))
      ) {
        if (target.matches("[data-toggle='dropdown'] *")) {
          target = target.closest("[data-toggle='dropdown']");
        }
        if (target !== null && target.classList.contains("active")) {
          target.classList.remove("active");
          target.closest(".dropdown")!.classList.remove("show");
        } else if (target !== null) {
          halfmoon.deactivateAllDropdownToggles();
          target.classList.add("active");
          target.closest(".dropdown")!.classList.add("show");
        }
      } else {
        if (!target.matches(".dropdown-menu *")) {
          halfmoon.deactivateAllDropdownToggles();
        }
      }

      // Handle clicks on alert dismiss buttons
      if (
        target !== null &&
        (target.matches(".alert [data-dismiss='alert']") ||
          target.matches(".alert [data-dismiss='alert'] *"))
      ) {
        if (target.matches(".alert [data-dismiss='alert'] *")) {
          target = target.closest(".alert [data-dismiss='alert']");
        }
        if (target?.parentElement) {
          target?.parentElement?.classList.add("dispose");
        }
      }

      // Handle clicks on modal toggles
      if (
        target !== null &&
        (target.matches("[data-toggle='modal']") ||
          target.matches("[data-toggle='modal'] *"))
      ) {
        if (target.matches("[data-toggle='modal'] *")) {
          target = target.closest("[data-toggle='modal']");
        }

        const dataTarget = target?.getAttribute("data-target") ?? null;
        const targetModal =
          target !== null && dataTarget !== null
            ? document.getElementById(dataTarget)
            : null;
        if (targetModal?.classList.contains("modal") && dataTarget !== null) {
          halfmoon.toggleModal(dataTarget);
        }
      }

      // Handle clicks on modal dismiss buttons
      if (
        target !== null &&
        (target.matches(".modal [data-dismiss='modal']") ||
          target.matches(".modal [data-dismiss='modal'] *"))
      ) {
        if (target.matches(".modal [data-dismiss='modal'] *")) {
          target = target.closest(".modal [data-dismiss='modal']");
        }
        target?.closest(".modal")?.classList.remove("show");
      }

      // Handle clicks on modal overlays
      if (target !== null && target.matches(".modal-dialog")) {
        let parentModal = target.closest(".modal");

        if (
          parentModal !== null &&
          parentModal.getAttribute("data-overlay-dismissal-disabled") !== null
        ) {
          if (parentModal.classList.contains("show")) {
            parentModal.classList.remove("show");
          } else {
            window.location.hash = "#";
          }
        }
      }

      // Call the click handler method to handle any logic set by the user in their projects to handle clicks
      halfmoon.clickHandler(eventCopy);
    },
    false
  );

  // Adding the key down event listener (for shortcuts and accessibility)
  document.addEventListener("keydown", function (event) {
    let eventCopy = event;

    // Shortcuts are triggered only if no input, textarea, or select has focus,
    // If the control key or command key is not pressed down,
    // And if the enabling data attribute is present on the DOM's body
    if (
      !(
        document.querySelector("input:focus") ||
        document.querySelector("textarea:focus") ||
        document.querySelector("select:focus")
      )
    ) {
      if (!(event.ctrlKey || event.metaKey)) {
        // Toggle sidebar when [shift] + [S] keys are pressed
        if (document.body.getAttribute("data-sidebar-shortcut-enabled")) {
          if (event.shiftKey && event.which == 83) {
            // letiable to store whether a modal is open or not
            let modalOpen = false;

            // Hash exists, so we check if it belongs to a modal
            if (window.location.hash) {
              let hash = window.location.hash.substring(1);
              let elem = document.getElementById(hash);
              if (elem) {
                if (elem.classList.contains("modal")) {
                  modalOpen = true;
                }
              }
            }
            // Check for a modal with the .show class
            if (document.querySelector(".modal.show")) {
              modalOpen = true;
            }

            // This shortcut works only if no modal is open
            if (!modalOpen) {
              halfmoon.toggleSidebar();
              event.preventDefault();
            }
          }
        }

        // Toggle dark mode when [shift] + [D] keys are pressed
        if (document.body.getAttribute("data-dm-shortcut-enabled")) {
          if (event.shiftKey && event.which == 68) {
            halfmoon.toggleDarkMode();
            event.preventDefault();
          }
        }
      }
    }

    // Handling other keydown events
    if (event.which === 27) {
      // Close dropdown menu (if one is open) when [esc] key is pressed
      if (document.querySelector("[data-toggle='dropdown'].active")) {
        let elem = document.querySelector("[data-toggle='dropdown'].active");
        elem?.classList.remove("active");
        elem?.closest(".dropdown")?.classList.remove("show");
        event.preventDefault();
      }
      // Close modal (if one is open, and if no dropdown menu is open) when [esc] key is pressed
      // Conditional on dropdowns so that dropdowns on modals can be closed with the keyboard without closing the modal
      else {
        // Hash exists, so we check if it belongs to a modal
        if (window.location.hash) {
          let hash = window.location.hash.substring(1);
          let elem = document.getElementById(hash);
          if (elem) {
            if (elem.classList.contains("modal")) {
              if (!elem.getAttribute("data-esc-dismissal-disabled")) {
                window.location.hash = "#";
                event.preventDefault();
              }
            }
          }
        }
        // Check for a modal with the .show class
        if (document.querySelector(".modal.show")) {
          let elem = document.querySelector(".modal.show");
          if (
            elem !== null &&
            !elem.getAttribute("data-esc-dismissal-disabled")
          ) {
            elem.classList.remove("show");
            event.preventDefault();
          }
        }
      }
    }

    // Call the keydown handler method to handle any logic set by the user in their projects to handle keydown events
    halfmoon.keydownHandler(eventCopy);
  });

  // Handling custom file inputs
  let HalfMoonCustomFileInputs = document.querySelectorAll(
    ".custom-file input"
  ) as NodeListOf<HTMLInputElement>;
  for (let i = 0; i < HalfMoonCustomFileInputs.length; i++) {
    let customFile = HalfMoonCustomFileInputs[i];
    // Create file name container element, add the class name, and set default value
    // Append it to the custom file element
    let fileNamesContainer = document.createElement("div");
    fileNamesContainer.classList.add("file-names");
    let dataDefaultValue = customFile.getAttribute("data-default-value");
    if (dataDefaultValue) {
      fileNamesContainer.innerHTML = dataDefaultValue;
    } else {
      fileNamesContainer.innerHTML = "No file chosen";
    }
    customFile.parentElement?.appendChild(fileNamesContainer);

    // Add the event listener that will update the contents of the file name container element on change
    customFile.addEventListener("change", function (event) {
      const target = event.target as HTMLInputElement;
      fileNamesContainer = target.parentElement?.querySelector(
        ".file-names"
      ) as HTMLDivElement;
      if ((target.files?.length ?? 0) === 1) {
        fileNamesContainer.innerHTML = target.files![0].name;
      } else if ((target.files?.length ?? 0) > 1) {
        fileNamesContainer.innerHTML = target.files!.length + " files";
      } else {
        fileNamesContainer.innerHTML = "No file chosen";
      }
    });
  }

  // Adding the .with-transitions class to the page-wrapper so that transitions are enabled
  // This way, the weird bug on Chrome is avoided, where the transitions run on load
  if (halfmoon.pageWrapper) {
    halfmoon.pageWrapper.classList.add("with-transitions");
  }
}
// Call the function when the DOM is loaded
document.addEventListener("DOMContentLoaded", HalfMoonOnDOMContentLoaded);
