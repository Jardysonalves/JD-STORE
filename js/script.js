const btn = document.getElementById("comprarBtn");
const pixBox = document.getElementById("pixInfo");
const qrImg = document.getElementById("qrCode");
const copiaCola = document.getElementById("copiaCola");
const statusLabel = document.getElementById("statusPagamento");
const downloadBox = document.getElementById("download");

let pagamentoID = null;

btn.addEventListener("click", async () => {
    pixBox.classList.remove("download-hidden");

    const req = await fetch("/criar-pix", { method: "POST" });
    const data = await req.json();

    pagamentoID = data.id;

    qrImg.src = `data:image/png;base64,${data.qr}`;
    copiaCola.value = data.copiaCola;

    verificarStatus();
});

async function verificarStatus() {
    const intervalo = setInterval(async () => {
        const req = await fetch(`/status/${pagamentoID}`);
        const data = await req.json();

        if (data.status === "approved") {
            clearInterval(intervalo);
            statusLabel.textContent = "Pagamento confirmado!";
            statusLabel.style.color = "lime";

            downloadBox.classList.remove("download-hidden");
        }
    }, 3000);
}
document.getElementById("qrCode").src =
  "data:image/png;base64," + resposta.qr;
