import 'angular';
import 'angular-mocks/angular-mocks';

const context = require.context('.', true, /\.js$/);

context.keys().forEach(context);
