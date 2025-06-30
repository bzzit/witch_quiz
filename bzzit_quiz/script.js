document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const questionImage = document.getElementById('questionImage'); // 이미지 요소 가져오기
    const answerInput = document.getElementById('answerInput');
    const submitBtn = document.getElementById('submitBtn');
    const feedbackElement = document.getElementById('feedback');

    // 퀴즈 데이터 (문제와 정답)
    const quizData = [

        {
            question: "우리가 오늘 함께 할 모험은 마녀의 성에서 시작합니다.\n \n 여러분은 갓 구워진 쿠키로,\n 마녀의 성을 탈출하기 위해 여행을 떠나기로 했습니다.\n \n여러분은 퍼즐을 풀고 성을 탈출할 수 있을까요?\n준비가 되었다면 다음 방으로 가는 마법의 단어를 외쳐주세요.",
            answer: "start"
        },
        {
            question: "첫 번째 문을 열고 들어가자,\n달콤한 냄새가 나는 마녀의 부엌이었습니다.\n\n마녀의 부엌에는 쿠키 반죽이 많이 있는 그릇이 있습니다.\n비밀 레시피에는 쿠키 반죽을 정확히 나누어야 한다고 써 있습니다.\n \n 비밀 쿠키 레시피\n반죽을 세 통으로 나누어야 한다. \n 첫 번째 통은 두 번째 통의 두 배가 되어야 하며, \n 세 번째 통은 첫 번째와 두 번째 통의 합보다 3개가 많아야 한다. \n\n 총 39개의 반죽이 있다면, 각 통에 몇 개씩 넣어야 할까요?",
            answer: "12621"
        },
        {
            question: "세 통에 각각 반죽을 넣으니,\n부엌 한 켠에 위치한 마법의 무지개 문에서 소리가 납니다.\n\n 문을 살펴보니 숫자를 입력할 수 있는 마법진이 있으며,\n문 앞으로 다가가니 글씨가 빛나기 시작합니다.\n\n DOOR = 52 \n DOUGH = 55 \n COOKIE = 58 \n\n WITCH + BERRY = ?",
            answer: "6368"
        },
        
        {   
            question: "마법의 무지개 문을 열고 복도를 지나니 솥단지를 발견했습니다.\n솥단지 근처에는 각종 마법 재료들이 놓여있고,\n<누구나 따라하는 마법 물약>이라는 책 한 권이 펼쳐져 있습니다.\n\n 옆을 둘러보니 계단이 있지만, 들어가기엔 너무나 작았습니다. \n마침 책에 있는 적당한 물약을 만들기로 하였습니다.",
            answer: "luck",
            image: "image/quiz4.png"
        },
        {
            question: "솥단지에 달콤한 설탕 시럽과 별사탕 가루 조금,\n그리고 행운의 네잎클로버를 넣고\n휙휙 저어서 물약을 만들었습니다.\n\n단숨에 들이마시니 몸이 작아졌습니다.\n계단을 내려가서 다음 방에 도착했지만 갑자기 불이 꺼졌습니다.\n불이 있던 곳으로 가보니 마법 열쇠가 놓여있습니다.\n\n불을 켜고 마법 열쇠를 얻으려면 숫자를 적어주세요. \n\n학교 556655 \n 별 115566 \n 비행기 ?",
            answer: "321233"
        },
        {
            question: "숫자를 입력하고 마법 열쇠로 문을 열어보니\n아래 층으로 가는 계단을 발견했습니다.\n\n 횃불로 밝혀진 계단을 따라가니 문이 있고,\n문에는 특이한 문양이 그려져 있습니다. \n\n 문 옆에는 거울이 있고, \n거울 아래에는 숫자를 입력할 수 있는 마법 깃펜이 있습니다.",
            answer: "5419",
            image: "image/quiz6.png"
        },
        {
            question: "마법 깃펜으로 숫자를 입력하자 문이 열렸고, 도서관에 도착했습니다.\n도서관에는 엄청나게 많은 책이 보관되어 있습니다\n책장 사이로 걸어가니 중앙에 마법 구슬이 반짝이고 있습니다.\n\n마법 구슬에 다가가자 그림과 문자가 떠오르고 \n신비로운 음성이 귓가에 들립니다.\n\n원하는 책을 찾으려면 정답을 차근차근 찾아보세요",
            answer: "story",
            image: "image/quiz7.png"
        },
        {
            question: "드디어 마녀에 성 이야기 책을 찾았습니다.\n책을 펼치니 다음과 같이 적혀있습니다. \n 성을 나가고자 하는 쿠키여, 준비가 되었습니까? \n그렇다면 다음 문제를 풀어보세요.\n\n1 4 7 8 9 \n 7 2 9 4 6\n 3 1 4 6 9 7 \n 1 2 3 2 5 8",
            answer: "LAST"
        },

        {
            question: "마침내 성 밖으로 나온 쿠키들은\n성 밖의 공기를 마시며\n앞으로도 멋진 모험이 기다리고 있다는 생각을 합니다.\n우리의 여정은 이제 시작입니다.\n앞으로 어떤 어려움이 있어도 오늘처럼 함께 힘을 모아서 이겨나가요!",
            answer: "end"
        }

    ];

    let currentQuestionIndex = 0;

    // 퀴즈 로드 함수
    function loadQuestion() {
        // HTML 요소에 텍스트를 할당할 때 <br> 태그로 변환
        questionElement.innerHTML = quizData[currentQuestionIndex].question.replace(/\n/g, '<br>');

         // 이미지 경로 설정
        if (quizData[currentQuestionIndex].image) {
            questionImage.src = quizData[currentQuestionIndex].image;
            questionImage.style.display = 'block'; // 이미지가 있다면 보이게 함
        } else {
            questionImage.style.display = 'none'; // 이미지가 없다면 숨김
        }

        answerInput.value = ''; // 입력창 초기화
        feedbackElement.textContent = ''; // 피드백 메시지 초기화
        feedbackElement.classList.remove('correct', 'wrong'); // 클래스 초기화
        answerInput.focus(); // 입력창에 자동 포커스
    }

    // 정답 확인 함수
    function checkAnswer() {
        const userAnswer = answerInput.value.trim(); // 공백 제거
        const correctAnswer = quizData[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = '정답입니다!';
            feedbackElement.classList.remove('wrong');
            feedbackElement.classList.add('correct');

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    loadQuestion(); // 다음 문제 로드
                } else {
                    questionElement.textContent = "모든 문제를 푸셨습니다! 축하합니다!";
                    answerInput.style.display = 'none';
                    submitBtn.style.display = 'none';
                    feedbackElement.textContent = ''; // 최종 메시지에서 정답/오답 메시지 제거
                }
            }, 1500); // 1.5초 후 다음 문제로 넘어감
        } else {
            feedbackElement.textContent = '오답입니다. 다시 시도해주세요.';
            feedbackElement.classList.remove('correct');
            feedbackElement.classList.add('wrong');
            answerInput.value = ''; // 오답 시 입력창 초기화
            answerInput.focus(); // 다시 입력할 수 있도록 포커스
        }
    }

    // 이벤트 리스너
    submitBtn.addEventListener('click', checkAnswer); // 버튼 클릭 시
    answerInput.addEventListener('keypress', (event) => { // 엔터 키 입력 시
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    // 페이지 로드 시 첫 번째 문제 로드
    loadQuestion();
});