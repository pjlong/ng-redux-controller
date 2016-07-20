# ng-redux-controller
Angular 1.x abstract controller to hook into Redux (via ngRedux)

Currently implemented in es6, unsuable without babel or some kind of transpiler.

##Usage
    import NgReduxController from '/path/to/ng-redux-controller';

    class MyController extends NgReduxController {
        constructor ($ngRedux) {
            super($ngRedux); //required to initialize 'this' as well as use $ngRedux

            this.reduxActions = angular.extend({}, { myActionCreator }, actionCreatorService);
        }

        $onInit () {
            super.$onInit();
            /* other stuff to do on init */
        }

        $mapState (state) {
            return {
                appState: state.appState,
                myReducer: state.myReducer
            }
        }

        $initRedux (states, actions) {
            if (!states.appState) {
                actions.myActionCreator();
            }
        }
    }
