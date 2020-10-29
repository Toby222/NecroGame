/* eslint-disable @typescript-eslint/no-non-null-assertion */
// halfmoon.js v1.1.1
// (badly) written into TS

export class halfmoon {
  // Getting the required elements
  // Re-initialized once the DOM is loaded (to avoid issues with virtual DOM)
  static pageWrapper: Element;
  static stickyAlerts: Element;

  static darkModeOn = false; // Also re-initialized once the DOM is loaded (see below)

  // Create cookie
  static createCookie(name: string, value: string, days: number) {
    let expires;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  // Read cookie
  static readCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  // Erase cookie
  static eraseCookie(name: string) {
    halfmoon.createCookie(name, "", -1);
  }

  // Toggle light/dark mode
  static toggleDarkMode() {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      halfmoon.darkModeOn = false;
      halfmoon.createCookie("halfmoon_preferredMode", "light-mode", 365);
    } else {
      document.body.classList.add("dark-mode");
      halfmoon.darkModeOn = true;
      halfmoon.createCookie("halfmoon_preferredMode", "dark-mode", 365);
    }
  }

  // Get preferred mode
  static getPreferredMode() {
    if (halfmoon.readCookie("halfmoon_preferredMode")) {
      return halfmoon.readCookie("halfmoon_preferredMode");
    } else {
      return "not-set";
    }
  }

  // Toggles sidebar
  static toggleSidebar() {
    if (halfmoon.pageWrapper) {
      if (halfmoon.pageWrapper.getAttribute("data-sidebar-hidden")) {
        halfmoon.pageWrapper.removeAttribute("data-sidebar-hidden");
      } else {
        halfmoon.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
      }
    }
  }

  // Deactivate all the dropdown toggles when another one is active
  static deactivateAllDropdownToggles() {
    const activeDropdownToggles = document.querySelectorAll("[data-toggle='dropdown'].active");
    for (let i = 0; i < activeDropdownToggles.length; i++) {
      activeDropdownToggles[i].classList.remove("active");
      activeDropdownToggles[i].closest(".dropdown")?.classList.remove("show");
    }
  }

  // Toggle modal (using Javascript)
  static toggleModal(modalId: string) {
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.classList.toggle("show");
    }
  }

  /* Code block for handling sticky alerts */

  // Make an ID for an element
  static makeId(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Toast an alert (show, fade, dispose)
  static toastAlert(alertId: string, timeShown?: number) {
    const alertElement = document.getElementById(alertId);

    if (alertElement === null) return;

    // Setting the default timeShown
    if (timeShown === undefined) {
      timeShown = 5000;
    }

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
      const timeToFade = timeShown + 250;
      setTimeout(function () {
        alertElement.classList.add("fade");
      }, timeToFade);

      // Wait some more time (timeToFade + 500) and dispose the alert (by removing the .alert-block class)
      // Again, the extra delay is for the animation
      // Remove the .show and .fade classes (so the alert can be toasted again)
      const timeToDestroy = timeToFade + 500;
      setTimeout(function () {
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
    const title = param.title ?? "";
    const alertType = param.alertType ?? "";
    const fillType = param.fillType ?? "";
    const hasDismissButton = param.hasDismissButton ?? true;
    const timeShown = param.timeShown ?? 5000;

    // Create the alert element
    const alertElement = document.createElement("div");

    // Set ID to the alert element
    alertElement.setAttribute("id", halfmoon.makeId(6));

    // Add the title
    if (title) {
      content = "<h4 class='alert-heading'>" + title + "</h4>" + content;
    }

    // Add the classes to the alert element
    alertElement.classList.add("alert");
    if (alertType) {
      alertElement.classList.add(alertType);
    }
    if (fillType) {
      alertElement.classList.add(fillType);
    }

    // Add the close button to the content (if required)
    if (hasDismissButton) {
      content =
        "<button class='close' data-dismiss='alert' type='button' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + content;
    }

    // Add the content to the alert element
    alertElement.innerHTML = content;

    // Append the alert element to the sticky alerts
    halfmoon.stickyAlerts.insertBefore(alertElement, halfmoon.stickyAlerts.childNodes[0]);

    // Toast the alert
    halfmoon.toastAlert(alertElement.getAttribute("id")!, timeShown);
  }

  /* End code block for handling sticky alerts */

  // Click handler that can be overridden by users if needed
  static clickHandler: (event: MouseEvent) => void;

  // Keydown handler that can be overridden by users if needed
  static keydownHandler: (event: KeyboardEvent) => void;

  static onDomContentLoaded: () => void;
}

/* Things done once the DOM is loaded */

function halfmoonOnDOMContentLoaded() {
  // Re-initializing the required elements (to avoid issues with virtual DOM)
  if (!halfmoon.pageWrapper) {
    halfmoon.pageWrapper = document.getElementsByClassName("page-wrapper")[0];
  }
  if (!halfmoon.stickyAlerts) {
    halfmoon.stickyAlerts = document.getElementsByClassName("sticky-alerts")[0];
  }

  // Handle the cookie and variable for dark mode
  // 1. First preference is given to the cookie if it exists
  if (halfmoon.readCookie("halfmoon_preferredMode")) {
    if (halfmoon.readCookie("halfmoon_preferredMode") == "dark-mode") {
      halfmoon.darkModeOn = true;
    } else {
      halfmoon.darkModeOn = false;
    }
  } else {
    // 2. If cookie does not exist, next preference is for the dark mode setting
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      halfmoon.darkModeOn = true;
    } else {
      // 3. If all else fails, re-initialize the dark mode preference depending on the .dark-mode class
      if (document.body.classList.contains("dark-mode")) {
        halfmoon.darkModeOn = true;
      } else {
        halfmoon.darkModeOn = false;
      }
    }
  }

  // Automatically set preferred theme
  // But only if one of the data-attribute is provided
  if (document.body.getAttribute("data-set-preferred-mode-onload") || document.body.getAttribute("data-set-preferred-theme-onload")) {
    if (halfmoon.darkModeOn) {
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
      if (!halfmoon.pageWrapper.getAttribute("data-show-sidebar-onload-sm-and-down")) {
        halfmoon.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
      }
    }
  } else {
    if (halfmoon.pageWrapper) {
      if (halfmoon.pageWrapper.getAttribute("data-sidebar-type") === "overlayed-all") {
        halfmoon.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
      }
    }
  }

  // Adding the click event listener
  document.addEventListener(
    "click",
    function (event) {
      const eventCopy = event;
      let target = event.target as Element | null;

      if (target === null) {
        halfmoon.clickHandler(eventCopy);
        return;
      }

      // Handle clicks on dropdown toggles
      if (target !== null && (target.matches("[data-toggle='dropdown']") || target.matches("[data-toggle='dropdown'] *"))) {
        if (target.matches("[data-toggle='dropdown'] *")) {
          target = target.closest("[data-toggle='dropdown']");
        }
        if (target?.classList.contains("active")) {
          target.classList.remove("active");
          target.closest(".dropdown")?.classList.remove("show");
        } else {
          halfmoon.deactivateAllDropdownToggles();
          target?.classList.add("active");
          target?.closest(".dropdown")?.classList.add("show");
        }
      } else {
        if (!target.matches(".dropdown-menu *")) {
          halfmoon.deactivateAllDropdownToggles();
        }
      }

      // Handle clicks on alert dismiss buttons
      if (target !== null && (target.matches(".alert [data-dismiss='alert']") || target.matches(".alert [data-dismiss='alert'] *"))) {
        if (target.matches(".alert [data-dismiss='alert'] *")) {
          target = target.closest(".alert [data-dismiss='alert']");
        }
        target?.parentElement?.classList.add("dispose");
      }

      // Handle clicks on modal toggles
      if (target !== null && (target.matches("[data-toggle='modal']") || target.matches("[data-toggle='modal'] *"))) {
        if (target.matches("[data-toggle='modal'] *")) {
          target = target.closest("[data-toggle='modal']");
        }
        if (target?.hasAttribute("data-target")) {
          const targetModal = document.getElementById(target.getAttribute("data-target")!);

          if (targetModal?.classList.contains("modal")) {
            halfmoon.toggleModal(target.getAttribute("data-target")!);
          }
        }
      }

      // Handle clicks on modal dismiss buttons
      if (target !== null && (target.matches(".modal [data-dismiss='modal']") || target.matches(".modal [data-dismiss='modal'] *"))) {
        if (target.matches(".modal [data-dismiss='modal'] *")) {
          target = target.closest(".modal [data-dismiss='modal']");
        }
        target?.closest(".modal")?.classList.remove("show");
      }

      // Handle clicks on modal overlays
      if (target !== null && target.matches(".modal-dialog")) {
        const parentModal = target.closest(".modal");

        if (!parentModal?.getAttribute("data-overlay-dismissal-disabled")) {
          if (parentModal?.classList.contains("show")) {
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
    const eventCopy = event;

    // Shortcuts are triggered only if no input, textarea, or select has focus,
    // If the control key or command key is not pressed down,
    // And if the enabling data attribute is present on the DOM's body
    if (!(document.querySelector("input:focus") || document.querySelector("textarea:focus") || document.querySelector("select:focus"))) {
      event = event || window.event;

      if (!(event.ctrlKey || event.metaKey)) {
        // Toggle sidebar when [shift] + [S] keys are pressed
        if (document.body.getAttribute("data-sidebar-shortcut-enabled")) {
          if (event.shiftKey && event.key === "s") {
            // Variable to store whether a modal is open or not
            let modalOpen = false;

            // Hash exists, so we check if it belongs to a modal
            if (window.location.hash) {
              const hash = window.location.hash.substring(1);
              const elem = document.getElementById(hash);
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
          if (event.shiftKey && event.key === "d") {
            halfmoon.toggleDarkMode();
            event.preventDefault();
          }
        }
      }
    }

    // Handling other keydown events
    if (event.key === "Escape") {
      // Close dropdown menu (if one is open) when [esc] key is pressed
      if (document.querySelector("[data-toggle='dropdown'].active")) {
        const elem = document.querySelector("[data-toggle='dropdown'].active");
        elem?.classList.remove("active");
        elem?.closest(".dropdown")?.classList.remove("show");
        event.preventDefault();
      }
      // Close modal (if one is open, and if no dropdown menu is open) when [esc] key is pressed
      // Conditional on dropdowns so that dropdowns on modals can be closed with the keyboard without closing the modal
      else {
        // Hash exists, so we check if it belongs to a modal
        if (window.location.hash) {
          const hash = window.location.hash.substring(1);
          const elem = document.getElementById(hash);
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
          const elem = document.querySelector(".modal.show");
          if (elem !== null && !elem.getAttribute("data-esc-dismissal-disabled")) {
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
  const halfmoonCustomFileInputs = document.querySelectorAll(".custom-file input");
  for (let i = 0; i < halfmoonCustomFileInputs.length; i++) {
    const customFile = halfmoonCustomFileInputs[i] as HTMLInputElement;
    // Create file name container element, add the class name, and set default value
    // Append it to the custom file element
    let fileNamesContainer = document.createElement("div");
    fileNamesContainer.classList.add("file-names");
    const dataDefaultValue = customFile.getAttribute("data-default-value");
    if (dataDefaultValue) {
      fileNamesContainer.innerHTML = dataDefaultValue;
    } else {
      fileNamesContainer.innerHTML = "No file chosen";
    }
    customFile.parentNode!.appendChild(fileNamesContainer);

    // Add the event listener that will update the contents of the file name container element on change
    customFile.addEventListener("change", function (event) {
      const target = event.target as HTMLInputElement;
      fileNamesContainer = target.parentNode!.querySelector(".file-names")! as HTMLDivElement;
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
halfmoon.onDomContentLoaded = halfmoonOnDOMContentLoaded;
