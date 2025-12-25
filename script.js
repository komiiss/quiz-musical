document.addEventListener("DOMContentLoaded", function () {

    // ===== INICIALIZA EMAILJS (UMA VEZ) =====
    emailjs.init("vlYq9HvmENNJlpvKV");

    // ===== QUIZ =====
    const btnFinalizar = document.getElementById("finalizarQuiz");

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", function () {
            let pontuacao = 0;

            // PERGUNTA 1
            const p1 = document.querySelector('input[name="pergunta1"]:checked');
            if (p1 && p1.value === "certo") pontuacao++;

            // PERGUNTA 2
            const p2 = document.getElementById("p2").value.trim().toLowerCase();
            if (p2 === "miley cyrus") pontuacao++;

            // PERGUNTA 3
            const p3 = document.querySelector('input[name="pergunta3"]:checked');
            if (p3 && p3.value === "certo") pontuacao++;

            // PERGUNTA 4
            const p4 = document.getElementById("p4").value;
            if (p4.startsWith("2021")) pontuacao++;

            // PERGUNTA 5
            const corretasP5 = ["drivers license", "deja vu", "good 4 u"];
            const marcadasP5 = document.querySelectorAll('input[name="pergunta5"]:checked');

            let respostasP5 = [];
            marcadasP5.forEach(cb => respostasP5.push(cb.value));

            if (
                respostasP5.length === 3 &&
                corretasP5.every(resp => respostasP5.includes(resp))
            ) {
                pontuacao++;
            }

            // PERGUNTA 6
            if (document.getElementById("p6").files.length > 0) pontuacao++;

            // PERGUNTA 7
            if (document.getElementById("p7").value === "certo") pontuacao++;

            // PERGUNTA 8
            const p8 = document.getElementById("p8").value.trim().toLowerCase();
            if (p8 === "katseye") pontuacao++;

            // ===== AVALIAÇÃO =====
            let avaliacao = "";

            if (pontuacao <= 2) {
                avaliacao = "Você passou longe. Hora de atualizar a playlist.";
            } else if (pontuacao <= 4) {
                avaliacao = "Quase lá. Falta maratonar uns álbuns.";
            } else if (pontuacao <= 6) {
                avaliacao = "Quase expert. Foi por pouco.";
            } else {
                avaliacao = "👑 Você vive e respira música pop.";
            }

            // ===== MOSTRAR RESULTADO =====
            document.getElementById("resultado").innerHTML = `
                <strong>Pontuação:</strong> ${pontuacao}/8 <br>
                ${avaliacao}
            `;

            // ===== MOSTRAR GABARITO =====
            document.getElementById("respostas").style.display = "block";
        });
    }

    // ===== FEEDBACK =====
    const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.send(
                "service_q75xx8t",
                "template_zpd8938",
                {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    message: document.getElementById("message").value
                }
            )
            .then(() => {
                document.getElementById("statusFeedback").innerText =
                    "Feedback enviado com sucesso 💌";
                feedbackForm.reset();
            })
            .catch(error => {
                console.log(error);
                document.getElementById("statusFeedback").innerText =
                    "Erro ao enviar feedback 😭";
            });
        });
    }

});

