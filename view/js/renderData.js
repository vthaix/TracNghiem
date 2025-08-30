document.addEventListener("DOMContentLoaded", () => {
    fetch("../../controller/echoJSON.php")
        .then(res => res.json())
        .then(data => {
            const launch = document.getElementById("launch");

            let achivement = 0;
            let easyCount = 0,
                mediumCount = 0,
                hardCount = 0,
                veryHardCount = 0;
            let totalCount = 0;
            const maxPerLevel = 5;
            const maxTotal = 20;

            function getRandomQuestion(level) {
                const filtered = data.filter(q => q.mucDo === level);
                if (filtered.length === 0) return null;
                return filtered[Math.floor(Math.random() * filtered.length)];
            }

            function renderQuestion() {
                if (totalCount >= maxTotal) {
                    launch.innerHTML = `
                        <div class="text-center mt-4">
                            <h2 class="finished">Bạn đã hoàn thành tất cả câu hỏi 🎉</class=h2>
                            <p class="finished">Tổng điểm: ${achivement} / ${maxTotal}</p>
                        </div>
                    `;
                    return;
                }

                let level = "";
                if (easyCount < maxPerLevel) level = "Dễ";
                else if (mediumCount < maxPerLevel) level = "Trung bình";
                else if (hardCount < maxPerLevel) level = "Khó";
                else if (veryHardCount < maxPerLevel) level = "Rất khó";

                const q = getRandomQuestion(level);
                if (!q) return;

                launch.innerHTML = `
                    <div class="text-center mb-3">
                        <p class="countQuest">Câu ${totalCount + 1} / ${maxTotal} | Mức độ: ${level}</p>
                    </div>
                    <div class="textQuestion d-flex justify-content-center align-items-center">
                        <p class="text quest">${q.cauHoi}</p>
                    </div>

                    <div class="row boxAnswer mt-4" style="padding-top: 50px;">
                        <div class="leftAnswerBox col-6 row">
                            <div class="answer topAnswer leftAnswer row" data-id="A">
                                <p class="ans">A. ${q.dapAnA}</p>
                            </div>
                            <div class="answer botAnswer leftAnswer row" data-id="C">
                                <p class="ans">C. ${q.dapAnC}</p>
                            </div>
                        </div>
                        <div class="rightAnswerBox col-6 row">
                            <div class="answer topAnswer rightAnswer row" data-id="B">
                                <p class="ans">B. ${q.dapAnB}</p>
                            </div>
                            <div class="answer botAnswer rightAnswer row" data-id="D">
                                <p class="ans">D. ${q.dapAnD}</p>
                            </div>
                        </div>
                    </div>
                `;

                document.querySelectorAll(".answer").forEach(ans => {
                    ans.onclick = () => {
                        const id = ans.dataset.id;
                        if (id.toLowerCase() === q.dapAnDung.toLowerCase()) {
                            ans.style.backgroundColor = "rgba(134, 255, 132, 1)";
                            achivement++;
                        } else {
                            ans.style.backgroundColor = "rgb(255, 130, 130)";
                        }

                        if (level === "Dễ") easyCount++;
                        else if (level === "Trung kình") mediumCount++;
                        else if (level === "Khó") hardCount++;
                        else if (level === "Rất khó") veryHardCount++;

                        totalCount++;

                        setTimeout(renderQuestion, 500);
                    };
                });
            }

            renderQuestion();
        })
        .catch(err => console.error("Fetch error:", err));
});