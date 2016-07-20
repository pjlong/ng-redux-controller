/**
 * Abstract Angular 1.x controller to connect it to a Redux store
 *
 * @class
 * @abstract
 * @requires ngRedux
 */
export default class NgReduxController {
    /**
     * NgReduxController requires only $ngRedux
     * Requires the child controller to initialize with $ngRedux
     *
     * @example
     *   super($ngRedux);
     *
     * @param  {Service} $ngRedux ngRedux service
     */
    constructor ($ngRedux) {
        'ngInject';
        angular.extend(this, { $ngRedux });

        // The action creators to bind to this controller
        this.reduxActions = {};
    }

    /**
     * If child class overloads $onInit, calling `super.$onInit()` is required
     */
    $onInit () {
        this.unsubscribe = this.$connect();
    }

    /**
     * If child class overloads $onDestroy, calling `super.$onDestroy()` is required
     */
    $onDestroy () {
        this.unsubscribe();
    }

    $connect () {
        return this.$ngRedux.connect(this.$mapState, this.reduxActions)((states, actions) => {
            this.$initRedux(states, actions);
            angular.extend(this, states, actions);
        });
    }

    /**
     * Maps the particular states in the Redux store to this controller
     * @param  {Object} state The main redux store
     * @return {Object}       An object mapping the states you want to connect to
     */
    $mapState (state) { // eslint-disable-line no-unused-vars
        return {};
    }

    /**
     * Virtual function, runs on initializtion of the state tree to the controller
     * @abstract
     * @param  {Object} states  Inherited Redux State tree
     * @param  {Object} actions All actions bound to this controller
     */
    $initRedux (states, actions) { // eslint-disable-line no-unused-vars
        return;
    }
}
