const createHtml = require('./modules/createHtml');
const createStyleguide = require('./modules/createStyleguide');

const source = 'src/components';

const successfulSaved = createHtml(source);

if(successfulSaved) {
    createStyleguide();
}
