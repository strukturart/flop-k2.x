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
  let found = false;
  clients.matchAll().then((clients) => {
    // Check if the app is already opened
    for (i = 0; i < clients.length; i++) {
      if (clients[i].url === event.data.url) {
        found = true;
        break;
      }
    }

    // If not, launch the app
    if (!found) {
      clients.openApp({ msg: "Data" });
    }
  });
});
