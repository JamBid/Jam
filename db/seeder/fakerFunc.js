const faker = require('faker');

const getRandomPerson = function(){
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let avatar = faker.image.avatar();

    return ({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'avatar': avatar,
        'imageType': 'url'
    });
}

const getRandomBid = function(min, max){
    let amount = faker.finance.amount(min, max, 2);

    return ({
        'amount': amount
    });
}

const getRandomProd = function(){
    let productName = faker.commerce.productName();
    let department = faker.commerce.department();
    let price = faker.commerce.price(10, 999, 2);
    let description = faker.lorem.sentences();
    let endDate = faker.date.future();

    return ({
        'productName': productName,
        'department': department,
        'price': price,
        'description': description,
        'endDate': endDate
    });
}

const getRandomQuestion = function(){
    let question = faker.hacker.phrase();

    question = question.replace(/.$/, "?");
    return ({
        'question': question
    });
}

const getRandomAnswer = function(){
    let answer = faker.hacker.phrase();

    return ({
        'answer': answer
    });
}

const getRandomProdImage = function(count){
    image = [];

    for(let i = 0; i < count; i++)
        image.push({
            'image':faker.random.image(),
            'imageType': 'url'
        });

    return (image);
}

module.exports = {
    'getRandomPerson':getRandomPerson,
    'getRandomBid':getRandomBid,
    'getRandomProd':getRandomProd,
    'getRandomQuestion':getRandomQuestion,
    'getRandomAnswer':getRandomAnswer,
    'getRandomProdImage':getRandomProdImage
}