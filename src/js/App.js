import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import API from './API';
import assignPreference from './lib/assignPreference';
import defaultPreference from './lib/defaultPreference';
import { isTouchDevice } from './lib/util';
import Keyboard from './lib/Keyboard';
import reducers from './reducers';
import Container from './Container';


/**
 * Photo layout editor
 *
 * @param {Object} el
 * @param {Object} options
 */
window.PLE = function(el, options)
{
	// set preference
	this.preference = assignPreference(defaultPreference, options);

	// set elements
	this.el = el;

	// set store
	this.store = createStore(reducers);

	// init keyboard event
	this.keyboard = Keyboard;
	this.keyboard.init();

	// check touch device
	if (isTouchDevice())
	{
		document.querySelector('html').classList.add('ple-touch');
	}

	// set API
	this.api = new API(this);

	render(
		<Provider store={this.store}>
			<Container PLE={this}/>
		</Provider>,
		el,
	)

	// TODO : init keyboard event
	// TODO : init Export
	// TODO : init API
	// TODO : play gridster
	// TODO : `this.store.body.dispatch(foo())` 형태로 외부 리듀스에 접근할 수 있다.
	// TODO : dispatch(foo()) 형식으로 action으로 호출
};