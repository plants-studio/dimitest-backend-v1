function create(key) {
  var sequence = document.getElementById('sequence');
  var sub = document.getElementsByClassName('sub');
  var question = document.getElementById('question');
  var answerText = document.getElementsByClassName('answer_text');
  var answerScoreType = document.getElementsByClassName('answer_score_type');
  var answerScoreNum = document.getElementsByClassName('answer_score_num');
  var answer = [];
  for (let i = 0; i < 2; i += 1) {
    var score = [];
    for (let j = i; j < i + 2; j += 1) {
      if (
        answerScoreType[j + i].options[answerScoreType[j + i].selectedIndex].value === '선택안함'
      ) {
        break;
      }
      score.push({
        type: answerScoreType[j + i].options[answerScoreType[j + i].selectedIndex].value,
        num: answerScoreNum[j + i].value,
      });
    }
    answer.push({
      text: answerText[i].value,
      score,
    });
  }
  var data = {
    sequence: sequence.options[sequence.selectedIndex].value,
    sub: [...sub]
      .map((v) => {
        if (v.options[v.selectedIndex].value === '선택안함') {
          return;
        }
        return v.options[v.selectedIndex].value;
      }).filter((v) => v != null),
    question: question.value,
    answer,
  };
  var key = document.getElementById('adminKey').value;
  axios
    .post(`/api/question/${key}`, { data })
    .then((res) => {
      alert(JSON.stringify(res));
    })
    .catch((err) => {
      alert(err);
    });
}

function select(dis) {
  var { value } = dis.options[dis.selectedIndex];
  var field = document.getElementById('subField');
  if (value !== 'ch1' && value !== 'non1' && value !== 'non2') {
    field.hidden = false;
  } else {
    field.hidden = true;
  }
}
