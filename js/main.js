let qrcode = undefined;

document.getElementById("generate-btn").addEventListener("click", (e) => {
    const link = document.getElementById("link").value.trim();
    const button = document.getElementById("generate-btn");

    if (link.length == 0) {
        const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("error-toast"));
        document.querySelector("#error-toast .toast-body").innerHTML = "Insira um link";
        toast.show();
        return;
    }

    button.innerHTML = `Gerando<span class="loader ms-2"></span>`;
    button.disabled = true;
    document.getElementById("qr").parentElement.classList.add("d-none");
    document.getElementById("qr").innerHTML = "";

    setTimeout(() => {
        try {
            qrcode = new QRCode("qr", {
                width: 512,
                height: 512,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            qrcode.makeCode(link);
        } catch (err) {
            console.error(err);
            const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("error-toast"));
            document.querySelector("#error-toast .toast-body").innerHTML = "Um erro inesperado ocorreu ao processar o link informado, tente novamente";
            button.innerHTML = `Gerar`;
            button.disabled = false;
            toast.show();
            return;
        }

        document.getElementById("qr").parentElement.classList.remove("d-none");
        button.innerHTML = `Gerar`;
        button.disabled = false;
    }, 2000);
});

function downloadImage(button) {
    button.innerHTML = `Downloading<span class="loader ms-2"></span>`;
    button.disabled = true;

    document.querySelector("#qr canvas").toBlob(function(blob) {
        window.saveAs(blob, "qrcode.png");
        button.innerHTML = `Download`;
        button.disabled = false;
    });
}