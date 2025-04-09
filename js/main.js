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
        qrcode = new QRCode("qr", {
            text: link,
            width: 512,
            height: 512,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        document.getElementById("qr").parentElement.classList.remove("d-none");
        button.innerHTML = `Gerar`;
        button.disabled = false;
    }, 2000);
});

function downloadImage(button) {
    button.innerHTML = `Downloading<span class="loader ms-2"></span>`;
    button.disabled = true;
    const img = document.querySelector('#qr img');

    fetch(img.src)
        .then(response => response.blob())
        .then(blob => {
            window.saveAs(blob, 'qr-code.png');
        });

    button.innerHTML = `Download`;

    /*domtoimage.toBlob()
        .then(function (blob) {
            window.saveAs(blob, 'my-node.png');
            button.innerHTML = `Download`;
            button.disabled = false;
        });*/
    /*const image = document.querySelector('#qr img');
    const link = document.createElement('a');

    console.log(image.src);
    let byteCharacters = atob(image.src);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const type = "image/png";
    const blob = new Blob(byteArrays, { type });
    const file = new File([blob], "qrcode.png", { type });
    
    fetch(image.src)
        .then(response => response.blob())
        .then(blob => {
            link.href = URL.createObjectURL(file);
            link.style.display = 'none';
            link.rel = 'noopener noreferrer';
            link.download = 'qrcode.png';
            link.type = 'image/png';
            link.target = '_blank';
            document.body.appendChild(link);

            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            link.dispatchEvent(clickEvent);

            setTimeout(() => URL.revokeObjectURL(link.href), 2000);
       // });*/
}