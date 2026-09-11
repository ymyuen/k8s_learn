/* quiz.js — 共用測驗元件
 * 使用方式（課程內）：
 *   <div class="quiz" data-answer="2">
 *     <p class="quiz-q">問題文字</p>
 *     <div class="quiz-opts">
 *       <button class="quiz-opt">選項 A</button>
 *       <button class="quiz-opt">選項 B</button>
 *       <button class="quiz-opt">選項 C</button>
 *     </div>
 *     <p class="quiz-feedback" aria-live="polite"></p>
 *   </div>
 *   <script src="../assets/quiz.js"></script>
 *
 * 約定：data-answer 為正確選項的 0-based 索引。
 * 測驗題應保持選項等長（相同字數），避免格式洩題。
 * 立即回饋、可重作答、鍵盤可操作。 */
(function () {
  "use strict";

  function initQuiz(quiz) {
    var opts = Array.prototype.slice.call(quiz.querySelectorAll(".quiz-opt"));
    var feedback = quiz.querySelector(".quiz-feedback");
    var answer = parseInt(quiz.getAttribute("data-answer"), 10);
    var answered = false;

    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "quiz-feedback";
      quiz.appendChild(feedback);
    }
    if (opts.length === 0 || isNaN(answer)) {
      feedback.textContent = "（測驗未設定完成）";
      return;
    }

    opts.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        if (answered) return;
        answered = true;
        opts.forEach(function (b) { b.setAttribute("disabled", "disabled"); });
        if (i === answer) {
          btn.classList.add("correct");
          feedback.className = "quiz-feedback correct";
          feedback.textContent = "正確。";
        } else {
          btn.classList.add("wrong");
          opts[answer].classList.add("correct");
          feedback.className = "quiz-feedback wrong";
          feedback.textContent = "答錯。";
        }
        feedback.appendChild(makeReset());
      });
    });

    function makeReset() {
      var reset = document.createElement("button");
      reset.type = "button";
      reset.className = "quiz-reset";
      reset.textContent = "再試一次";
      reset.addEventListener("click", function () {
        answered = false;
        opts.forEach(function (b) {
          b.removeAttribute("disabled");
          b.classList.remove("correct", "wrong");
        });
        feedback.className = "quiz-feedback";
        feedback.textContent = "";
      });
      return reset;
    }
  }

  function onReady() {
    document.querySelectorAll(".quiz").forEach(initQuiz);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
