$(function () {
  // Logica di trascinamento della finestra, aggiornata per supportare dispositivi mobili
  (function () {
    let isMouseDown = false;
    let offset = { x: 0, y: 0 };

    const startDragging = function (e) {
      isMouseDown = true;
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;

      offset.x = clientX - $(this).parent().offset().left;
      offset.y = clientY - $(this).parent().offset().top;

      $(document).on("mousemove touchmove", onMouseMove);
      $(document).on("mouseup touchend", onMouseUp);
    };

    const onMouseMove = function (e) {
      if (isMouseDown) {
        const windowElem = $(".window");
        const windowWidth = windowElem.outerWidth();
        const windowHeight = windowElem.outerHeight();

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        let newLeft = clientX - offset.x;
        let newTop = clientY - offset.y;

        const viewportWidth = $(window).width();
        const viewportHeight = $(window).height();

        newLeft = Math.max(0, Math.min(newLeft, viewportWidth - windowWidth));
        newTop = Math.max(0, Math.min(newTop, viewportHeight - windowHeight));

        windowElem.css({
          left: newLeft + "px",
          top: newTop + "px",
          position: "absolute",
        });
      }
    };

    const onMouseUp = function () {
      isMouseDown = false;
      $(document).off("mousemove touchmove", onMouseMove);
      $(document).off("mouseup touchend", onMouseUp);
    };

    $(".title-bar").on("mousedown touchstart", startDragging);
  })();

  const fileSystem = {
    elxes: {
      "readme.txt":
        "This is the README file. It contains important information!",
      "secret.exe": "You found an Easter Egg! The secret is out!",
      system32: {
        "system.txt": "System files and important data.",
      },
      folder: {
        "note.txt": "This is a note inside a folder.",
        "hidden.txt": "Another hidden secret! You are really exploring!",
      },
    },
  };

  let currentPath = "elxes";

  function listFiles(path) {
    let dir = fileSystem;
    const parts = path.split("/").filter(Boolean);
    parts.forEach((part) => {
      dir = dir[part];
    });
    return dir;
  }

  // Aggiungi la funzione showCalendar
  function showCalendar() {
    const moment = window.moment;
    if (!moment) {
      this.echo("moment.js is required to display the calendar.");
      return;
    }

    const month = moment().format("MMMM YYYY");
    const daysInMonth = moment().daysInMonth();
    const startDay = moment().startOf("month").day(); // Giorno della settimana del primo giorno del mese

    let calendar = `\n${month}\nSu Mo Tu We Th Fr Sa\n`;

    calendar += "   ".repeat(startDay);

    for (let day = 1; day <= daysInMonth; day++) {
      calendar += day.toString().padStart(2, " ") + " ";
      if ((startDay + day) % 7 === 0) {
        calendar += "\n"; // Nuova riga dopo ogni settimana
      }
    }

    this.echo(calendar);
  }

  // Aggiungi la funzione showTime
  function showTime() {
    const moment = window.moment;
    if (!moment) {
      this.echo("moment.js is required to display the time.");
      return;
    }

    const time = moment().format("HH:mm:ss");
    this.echo(`Current time: ${time}`);
  }

  $("#terminal").terminal(
    {
      dir: function () {
        const files = listFiles(currentPath);
        if (typeof files === "object") {
          this.echo(Object.keys(files).join("\n"));
        } else {
          this.echo("No such directory.");
        }
      },
      cd: function (dir) {
        if (dir === "..") {
          const parts = currentPath.split("/").filter(Boolean);
          if (parts.length > 1) {
            currentPath = parts.slice(0, -1).join("/") || "elxes";
          } else {
            currentPath = "elxes";
          }
        } else if (dir === "/") {
          currentPath = "elxes";
        } else {
          const newPath = currentPath + "/" + dir;
          const files = listFiles(newPath);
          if (files && typeof files === "object") {
            currentPath = newPath;
          } else {
            this.echo("No such directory: " + dir);
          }
        }
        this.set_prompt("C:\\" + currentPath + ">");
      },

      rmdir: function (dir) {
        if (dir === "system32") {
          $("#bsod").show();
        } else {
          this.echo("No such directory: " + dir);
        }
      },
      bio: function () {
        this.echo(
          "Username: Elxes\nAge: 20\nGender: Female\nOccupation: Software Developer",
        );
      },
      skills: function () {
        this.echo(
          "Languages: Python, JavaScript, C++\nHobbies: Gaming, Reading, Hiking",
        );
      },
      secret: function () {
        this.echo(
          "Shh... you've found the secret command! I'm also a huge fan of retro technology.",
        );
      },
      "easter-egg": function () {
        this.echo(
          "You unlocked an Easter Egg! Here's a joke: Why do programmers prefer dark mode?\nBecause the light attracts bugs!",
        );
      },
      ilovecats: function () {
        this.echo(`\
              /\\_/\\
             ( o.o ) < I love you too!
              > ^ <
            `);
      },
      fortune: function () {
        this.echo(
          "Your future is bright and full of possibilities! Keep coding and never stop learning.",
        );
      },

      links: function () {
        this.echo(
          "GitHub: https://github.com/Elxes04\nTelegram: https://t.me/NonPericolosa",
        );
      },

      hikaru: function () {
        this.echo("How did you know him? Go away from him, he is mine.");
      },

      help: function () {
        this.echo(
          "Available commands:\n- bio\n- skills\n- links\n- dir\n- cd [directory]\n- read [file]\n- rmdir [directory]",
        );
      },

      // Implementazione della funzione cat
      read: function (file) {
        const files = listFiles(currentPath);
        if (files && files[file]) {
          if (typeof files[file] === "string") {
            this.echo(files[file]);
          } else {
            this.echo(file + " is a directory.");
          }
        } else {
          this.echo("No such file: " + file);
        }
      },

      // Aggiungi la funzione showCalendar al terminale
      calendar: showCalendar,

      // Aggiungi la funzione showTime al terminale
      time: showTime,
    },
    {
      greetings:
        "Welcome to Elxes Site! Type 'help' to see available commands.",
      prompt: "C:\\" + currentPath + ">",
      name: "retro_terminal",
      height: 300,
      width: "100%",
      completion: true,
    },
  );
});
