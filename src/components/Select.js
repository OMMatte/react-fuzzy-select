import React from "react";

export default function Select({
                                   options,
                                   value,
                                   onInputChange,
                                   onOptionSelected,
                                   onFocus,
                                   onBlur,
                                   maxOptions,
                                   inputClassName,
                                   dropdownClassName,
                                   optionClassName,
                                   inputStyle,
                                   dropdownStyle,
                                   optionStyle,
                                   renderOption,
                               }) {
    const inputElement = React.useRef();
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [activeOptionIndex, setActiveOptionIndex] = React.useState(null);

    function localGetOptionName(option) {
        return option.label;
    }

    const actualValue = activeOptionIndex === null ? value : localGetOptionName(options[activeOptionIndex]);

    function localOnOptionSelected(e, optionIndex) {
        e.preventDefault();
        setActiveOptionIndex(null);
        onOptionSelected && onOptionSelected(options[optionIndex], optionIndex, e);
        inputElement.current.blur();
        onInputChange('', e);
    }

    function onChange(e) {
        setActiveOptionIndex(null);
        onInputChange(e.target.value, e);
    }

    function onKeyDown(e) {
        if (e.key === "Escape") {
            setShowDropdown(false);
        } else {
            setShowDropdown(true);
        }
        if (e.key === 'Enter') {
            if (options.length > 0 || activeOptionIndex !== null) {
                localOnOptionSelected(e, activeOptionIndex || 0);
            }
        }
        if (e.key === "ArrowDown") {
            if (options.length > 0) {
                if (activeOptionIndex === null) {
                    setActiveOptionIndex(0);
                } else if (activeOptionIndex >= options.length - 1) {
                    setActiveOptionIndex(null)
                } else {
                    setActiveOptionIndex(activeOptionIndex + 1);
                }
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (options.length > 0) {
                if (activeOptionIndex === null) {
                    setActiveOptionIndex(options.length - 1);
                } else if (activeOptionIndex <= 0) {
                    setActiveOptionIndex(null)
                } else {
                    setActiveOptionIndex(activeOptionIndex - 1);
                }
            }
        }
    }

    function onOptionKeyDown(e, optionIndex) {
        if (e.key === 'Enter') {
            localOnOptionSelected(e, optionIndex);
        }
    }

    function onInputFocus() {
        onFocus && onFocus();
        setShowDropdown(true)
    }

    function onInputBlur() {
        onBlur && onBlur();
        setShowDropdown(false)
    }

    const inputDropdownOptionsStyles = {display: showDropdown && options.length > 0 ? 'block' : 'none', ...dropdownStyle};

    function getInputDropdownOptionStyles(index) {
        return {...(index === activeOptionIndex ? {backgroundColor: '#ddd'} : {}), ...optionStyle}
    }

    function getInputStyle() {
        return {
            width: "100%",
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
            ...inputStyle
        }
    }

    console.log(options);
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <input
                onKeyDown={onKeyDown}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                ref={inputElement}
                className={"input-dropdown " + (inputClassName ? inputClassName : '')}
                style={getInputStyle()}
                value={actualValue}
                onChange={onChange}
                type="text" placeholder="Find city..."/>

            <div className={"input-dropdown-options " + (dropdownClassName || '')}
                 style={inputDropdownOptionsStyles}>
                {(maxOptions ? options.slice(0, maxOptions) : options).map((option, index) =>
                    <div key={index}
                         tabIndex={0}
                         onKeyDown={(e) => onOptionKeyDown(e, index)}
                         onMouseDown={(e) => {
                             e.preventDefault()
                         }}
                         className={"input-dropdown-option " + (optionClassName || '')}
                         style={getInputDropdownOptionStyles(index)}
                         onClick={(e) => localOnOptionSelected(e, index)}>
                        {renderOption ? renderOption(option, index) : localGetOptionName(option)}
                    </div>
                )}
            </div>
        </div>
    )
}






