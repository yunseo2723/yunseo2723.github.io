(function () {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Mobile nav toggle
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        // 메뉴 클릭하면 닫기
        navMenu.querySelectorAll("a").forEach((a) => {
            a.addEventListener("click", () => {
                navMenu.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });

        // 바깥 클릭하면 닫기
        document.addEventListener("click", (e) => {
            const target = e.target;
            if (!target) return;
            const clickedInside =
                navMenu.contains(target) || navToggle.contains(target);
            if (!clickedInside) {
                navMenu.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Contact form (Formspree를 쓸 때 UX 개선)
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (form && status) {
        form.addEventListener("submit", async (e) => {
            // Formspree ID를 바꾸지 않았으면 그냥 기본 submit되게 두지 말고 안내
            const action = form.getAttribute("action") || "";
            if (action.includes("REPLACE_WITH_YOUR_ID")) {
                e.preventDefault();
                status.textContent =
                    "⚠️ 먼저 Formspree 폼 주소를 action에 넣어주세요. (index.html에서 REPLACE_WITH_YOUR_ID 교체)";
                return;
            }

            // AJAX로 제출(성공/실패 메시지)
            e.preventDefault();
            status.textContent = "전송 중...";

            try {
                const formData = new FormData(form);
                const res = await fetch(action, {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" },
                });

                if (res.ok) {
                    form.reset();
                    status.textContent = "✅ 전송 완료! 곧 답장드릴게요.";
                } else {
                    status.textContent = "❌ 전송 실패. 잠시 후 다시 시도해 주세요.";
                }
            } catch (err) {
                status.textContent = "❌ 네트워크 오류. 인터넷 연결을 확인해 주세요.";
            }
        });
    }
})();
