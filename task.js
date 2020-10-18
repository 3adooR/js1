/** Массив с данными о покупках пользователей @type {*[]} */
const buys = [["a", "b"], ["a", "c"], ["d", "e"]];

/**
 * Уведомление об ошибке
 * @param e
 */
const showError = (e) => {
    alert(e);
}

/**
 * Отображение результата
 * @param result
 */
const showResult = (result) => {
    let resultText = `<h2>Максимальная группа рекомендаций:</h2>`;
    resultText += `<h1>${result}</h1>`;
    document.querySelector('.container').innerHTML = resultText;
}

/**
 * Получение списка других покупок
 * @param num
 * @param buys
 */
const getAnotherBuys = (num, buys) => {
    let anotherBuys = [];
    buys.forEach(function (cart, cartNum) {
        if (num !== cartNum) {
            anotherBuys[cartNum] = cart;
        }
    });
    return anotherBuys;
}

/**
 * Определение максимального списка рекомендаций
 * @param recommendsList - списки рекомендаций
 * @returns {Array} - максимальный список
 */
const getMaxRecommendsList = (recommendsList) => {
    let maxRecommends = 0, maxRecommendsList = [];
    recommendsList.forEach(function (recommends, num) {
        let countRecommends = recommends.length;
        if (countRecommends > maxRecommends) {
            maxRecommends = countRecommends;
            maxRecommendsList = recommends;
        }
    });
    return maxRecommendsList;
}

/**
 * Нахождение максимального списка рекомендаций
 * @param buys - исторические данные о покупках пользователей
 * @returns {array} - максимальный список рекомендаций;
 * Если количество рекомендаций в группах одинаковое - то возвращает первую группу, из отсортированных в лексикографическом порядке
 */
const maxItemAssociation = (buys) => {
    let recommendsList = [], recommends = [], anotherBuys = [];

    if (buys.length) {
        buys.forEach(function (cart, cartNum) {
            // Получаем список других покупок, исключая текущую
            anotherBuys = getAnotherBuys(cartNum, buys);

            //Берём продукты из текущей покупки
            cart.forEach(function (item) {
                // Рекомендации для данного товара
                recommends[item] = cart;

                // Ищем продукт в других покупках, добавляем рекомендации для данного товара
                anotherBuys.forEach(function (anotherCart, anotherCartNum) {
                    let fndIndx = anotherCart.indexOf(item);
                    if (fndIndx != -1) {
                        anotherCart.forEach(function (anotherItem) {
                            if (recommends[item].indexOf(anotherItem) == -1) {
                                recommends[item].push(anotherItem);
                            }
                        });
                    }
                });

                // Сортируем список рекомендаций для данного товара
                recommends[item].sort();
                recommendsList[cartNum] = recommends[item];
            });
        });

    } else {
        showError('Не передан массив с данными покупателей');
    }

    // Возвращаем результат или выводим ошибку
    if (!recommendsList.length) {
        showError('Не удалось составить список рекомендаций');

    } else {
        return getMaxRecommendsList(recommendsList);
    }
}

// При загрузке страницы выполняем задачу
document.addEventListener(
    "DOMContentLoaded",
    showResult(maxItemAssociation(buys))
);