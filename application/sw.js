import localforage from "localforage";
const userAgent = navigator.userAgent || "";
//KaiOS 3 open app
if (userAgent && !userAgent.includes("KAIOS")) {
  self.onsystemmessage = (evt) => {
    const serviceHandler = () => {
      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();

        if (handler.source.name == "flop") {
          localforage
            .setItem("connect_to_id", handler.source.data)
            .then((e) => {});

          self.clients.openWindow("index.html");
        }
      }
    };
    evt.waitUntil(serviceHandler());
  };
}

self.addEventListener("push", function (event) {
  if (!event.data) {
    return;
  }

  let data;
  try {
    data = event.data.json();
  } catch (e) {
    console.error("Push event data is not JSON:", e);
    return;
  }

  const options = {
    body: data.body || "No content",
    icon: "/assets/icons/icon-512.png",
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "New Message", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (var i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          if (client.url == "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) {
          return clients
            .openWindow(new URL("/", self.location.origin))
            .then((w) => w.focus());
        }
        if (clients.openApp) {
          return clients.openApp();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
