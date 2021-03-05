import React from "react";
import Select from './Select';
import fuzzysort from 'fuzzysort';

function isDefined(obj) {
    return obj !== null && obj !== undefined;
}

export default function FuzzySelect({
                                        options,
                                        value,
                                        onInputChange,
                                        onOptionSelected,
                                        onFocus,
                                        onBlur,
                                        defaultOptions,
                                        maxOptions,

                                        inputClassName,
                                        dropdownClassName,
                                        optionClassName,
                                        inputStyle,
                                        dropdownStyle,
                                        optionStyle,

                                        renderOption,
                                        scoreFn,
                                        threshold,
                                    }) {
    const [localValue, setLocalValue] = React.useState('');
    const [optionsWithIndex, setOptionsWithIndex] = React.useState([]);
    const [nrOfKeys, setNrOfKeys] = React.useState(1);

    const searchString = isDefined(value) ? value : localValue;

    const onSelectInputChange = (value, e) => {
        !isDefined(value) && setLocalValue(value);
        onInputChange && onInputChange(value, e);
    };

    React.useEffect(() => {
        // for performance
        // targets.forEach(t => t.filePrepared = fuzzysort.prepare(t.file))
        let maxNumberOfKeys = 1;
        setOptionsWithIndex(options.map((option, index) => {
            if (option.searchTerms?.length > maxNumberOfKeys) {
                maxNumberOfKeys = option.searchTerms.length;
            }
            return {
                index: index, option: {
                    searchTerms: [option.label],
                    ...option
                }
            }
        }));
        setNrOfKeys(maxNumberOfKeys)

    }, [options]);

    let searchResults = [];
    let keys = [];
    for (let i = 0; i < nrOfKeys; i++) {
        keys.push('option.searchTerms.' + i);
    }

    if (!searchString && defaultOptions) {
        searchResults = defaultOptions.map((o, i) => ({obj: {index: i, option: o}}));
    } else {
        searchResults = fuzzysort.go(
            searchString,
            optionsWithIndex
            , {keys, allowTypo: true, limit: maxOptions}) //limit, scoreFn, threshold: threshold});
    }
    const selectOptions = searchResults.map(result => result.obj.option);
    return (
        <Select options={selectOptions}
                value={searchString}
                onInputChange={(value, e) => onSelectInputChange(value, e)}
                onOptionSelected={(option, index, e) => {
                    onOptionSelected && onOptionSelected(option, searchResults[index].obj.index, e)
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                maxOptions={maxOptions}

                inputClassName={inputClassName}
                dropdownClassName={dropdownClassName}
                optionClassName={optionClassName}
                inputStyle={inputStyle}
                dropdownStyle={dropdownStyle}
                optionStyle={optionStyle}

                renderOption={(option, index) => renderOption && renderOption(option, searchResults[index].obj.index)}
        />
    )
}






