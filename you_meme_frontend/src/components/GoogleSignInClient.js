const GoogleSignInClient = (callback) => {
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = "googleSignInClient";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default GoogleSignInClient;
