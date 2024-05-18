// Check if the protocol is not 'file:'
if (document.location.protocol !== 'file:') {
   var client = new XMLHttpRequest();
   client.open("HEAD", document.location, false);
   client.send(null);
   var clickJacking = client.getAllResponseHeaders();
   var upper = clickJacking.toUpperCase();

   function showNotification(message, color, pocHtml, isVulnerable) {
       var notification = document.createElement("div");
       notification.style.position = "fixed";
       notification.style.top = "0";
       notification.style.width = "100%";
       notification.style.backgroundColor = color;
       notification.style.color = "#fff";
       notification.style.textAlign = "center";
       notification.style.padding = "10px";
       notification.style.zIndex = "10001";
       notification.innerText = message;
       notification.style.cursor = "pointer"; // Make the notification clickable
       document.body.appendChild(notification);

       notification.addEventListener('click', function() {
           if (isVulnerable) {
               // Create a Blob with the PoC code
               var blob = new Blob([pocHtml], {type: 'text/html'});
               
               // Create a temporary URL for the Blob
               var url = URL.createObjectURL(blob);

               // Extract domain name from the document location
               var domain = document.location.hostname.replace(/[^a-z0-9]/gi, '-');
               
               // Create file name
               var fileName = 'Clickjacking-POC-' + domain + '.html';

               // Create an anchor element to trigger the download
               var a = document.createElement('a');
               a.href = url;
               a.download = fileName;
               a.style.display = 'none';
               document.body.appendChild(a);

               // Trigger the download
               a.click();

               // Clean up
               URL.revokeObjectURL(url);
               document.body.removeChild(a);

               // Show notification that PoC file is saved
               showNotification('PoC file saved as ' + fileName, '#ff0000', '', false);
           }
       });

       setTimeout(function() {
           notification.remove();
       }, 4000);
   }

   if (!upper.includes("X-FRAME-OPTIONS")) {
       document.body.style.border = "8px solid red";

       // Create a div to show the PoC code
       var htmlPoC = `
   <!DOCTYPE html>
   <html>
   <head>
       <title>Clickjacking PoC</title>
   </head>
   <body>
       <iframe src="${document.location}" width="100%" height="550px" style="border: 5px solid red;"></iframe>
   </body>
   </html>`;

       // Show notification about clickjacking detection and allow saving PoC
       showNotification('Potential Clickjacking vulnerability detected. Click to save PoC file.', '#ff0000', htmlPoC, true); // Red color for the notification
   } else {
       // Show notification indicating no Clickjacking vulnerability
       showNotification('No Clickjacking vulnerability detected. X-Frame-Options header is present.', '#00cc00', '', false); // Green color for the notification
   }
}
