import EmberRouter from '@ember/routing/router';
import config from 'validation-monitoring-tool/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('document-upload', { path: '/' });
  this.route('document-review');
  this.route('validation-results');
});
