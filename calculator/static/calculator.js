function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const expression = document.getElementById('display').value;
    const result = eval(expression);
    

    fetch('/save_result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression, result }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            clearDisplay();
            document.getElementById('display').value=result;
            refreshHistory(); // 刷新历史记录
        } else {
            console.error('保存结果失败');
        }
    })
    .catch(error => {
        console.error('保存结果失败:', error);
    });
}


function refreshHistory() {
    fetch('/get_history')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';

            data.history.forEach(item => {
                const historyItem = document.createElement('li');
                historyItem.textContent = item;
                historyList.appendChild(historyItem);
            });
        } else {
            console.error('获取历史记录失败');
        }
    })
    .catch(error => {
        console.error('获取历史记录失败:', error);
    });
}

function clearHistory() {
    fetch('/clear_history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            refreshHistory(); // 刷新历史记录
        } else {
            console.error('清除历史记录失败');
        }
    })
    .catch(error => {
        console.error('清除历史记录失败:', error);
    });
}



function calculateSin() {
    const value = parseFloat(document.getElementById('display').value);
    const result = Math.sin(value);
    appendToDisplay(result);
    //document.getElementById('display').value = result;
}

function calculateCos() {
    const value = parseFloat(document.getElementById('display').value);
    const result = Math.cos(value);

    document.getElementById('display').value = result;
}

function calculateTan() {
    const value = parseFloat(document.getElementById('display').value);
    const result = Math.tan(value);

    document.getElementById('display').value = result;
}
