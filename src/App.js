import FuzzySelect from './components/FuzzySelect';
import React from 'react';

const options = [
    {value: 'stockholm', label: 'Stockholm'},
    {value: 'oslo', label: 'Oslo', searchTerms: ['norway', 'oslo']},
    {value: 'helsinki', label: 'helsinki', searchTerms: ['finland']}
];

function App() {
    const [value, setValue] = React.useState();
    const onInputChange = (value, e) => {
        console.log('onInputChange', value, e);
        setValue(value);
    };

    const onOptionSelected = (option, index, e) => {
        console.log('onOptionSelected', option, index, e);
    };

    return (
        <FuzzySelect options={options}
                     value={value}
                     onInputChange={(value, e) => onInputChange(value, e)}
                     onOptionSelected={(option, index, e) => onOptionSelected(option, index, e)}
                     onFocus={() => console.log('onFocus')}
                     onBlur={() => console.log('onBlur')}
                     defaultOptions={[options[0]]}
                     maxOptions={2}

                     inputClassName={'custom-input'}
                     dropdownClassName={'custom-dropdown'}
                     optionClassName={'custom-option'}
                     inputStyle={{backgroundColor: 'red'}}
                     dropdownStyle={{backgroundColor: 'blue'}}
                     optionStyle={{backgroundColor: 'green'}}

                     renderOption={(option, index) => (
                         <div>
                             {index} {option.label}
                         </div>
                     )}

            // scoreFn={searchScoreFn}
            // threshold={scoreThreshold}
        />
    );
}

export default App;
