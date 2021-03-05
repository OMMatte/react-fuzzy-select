# React Fuzzy Search Input

React input component with fast fuzzy search.
* High performance fuzzy search using [fuzzysort](https://github.com/farzher/fuzzysort)
* Simple API 
* Basic styles and CSS provided. Or use custom css and/or styles.
* Keyboard navigation support

## Install

The easiest way to use react-fuzzy-search-input is to install it using npm or yarn

```
npm install react-fuzzy-search-select --save
```
```
yarn add react-fuzzy-search-select
```

### Usage Simplest Example

```js
import React from 'react';
import FuzzySearchInput from 'React-Fuzzy-Search-Input';

const options = [
    {value: 'stockholm', label: 'Stockholm'},
    {value: 'oslo', label: 'Oslo', searchTerms: ['norway', 'oslo']},
    {value: 'helsinki', label: 'helsinki', searchTerms: ['finland']}
];

function App() {
    const onOptionSelected = option => {
        console.log('Value selected: ', option.value);
    };

    return (
        <FuzzySearchInput options={options}
                          onOptionSelected={option => onOptionSelected(option)}

        />
    );
}
```