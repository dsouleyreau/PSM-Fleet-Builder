import { createRef } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import './Select.css';

type SelectProps = {
    defaultSelectText?: string
    defaultSelectOption?: string
    optionsList: { value: string, display: string | JSX.Element }[]
    onOptionSelect?: (value: string) => void
} & JSX.IntrinsicAttributes & JSX.HTMLAttributes<HTMLDivElement>

// based on https://medium.com/@swapnesh/creating-custom-select-component-in-reactjs-a56ba68b055a

const Select = ({ defaultSelectText, defaultSelectOption, optionsList, onOptionSelect, ...props }: SelectProps) => {

    const [selectText, setSelectText] = useState<string | JSX.Element | undefined>(defaultSelectText);
    const [showOptionList, setShowOptionList] = useState(false);

    const containerRef = createRef<HTMLDivElement>();

    return useMemo(() => {
        useEffect(() => {
            document.addEventListener("click", handleClickOutside);

            if (defaultSelectOption) {
                const defaultOption = optionsList.find( option => option.value === defaultSelectOption);
                if (defaultOption) {
                    setSelectText(() => defaultOption.display);
                    if (onOptionSelect) {
                        onOptionSelect(defaultOption.value);
                    }
                }
            }

            return () => {
                document.removeEventListener("click", handleClickOutside);
            }
        }, [defaultSelectOption]);

        const handleClickOutside = useCallback((event: MouseEvent) => {
            const element = (event.target as HTMLElement);
            
            if (!(element === containerRef.current || containerRef.current?.contains(element))) {
                setShowOptionList(() => false);
            }
        }, []);

        const handleListDisplay = () => {
            setShowOptionList(() => !showOptionList);
        }

        const handleOptionClick = useCallback((event: Event) => {
            const target = (event.target as HTMLLIElement);
            const value = target.dataset.name!;
            if (onOptionSelect) onOptionSelect(value);
            setSelectText(() => target.textContent!);
            setShowOptionList(() => false);
        }, []);

        return (
            <div
                className={ 'select-container' + ( props.className && ' ' + props.className ) }
                ref={ (ref) => { if (!ref) return; containerRef.current = ref } }
            >
                <div
                    className={ 'selected-text' + (showOptionList ? ' active' : '') }
                    onClick={ handleListDisplay }
                >
                    { selectText === defaultSelectText ?
                        selectText
                        :
                        <b>{ selectText }</b>
                    }
                </div>
                { showOptionList && (
                    <ul className="select-options">
                        { optionsList.map(option => {
                            return (
                                <li
                                    className="select-option"
                                    data-name={ option.value }
                                    key={ option.value }
                                    onClick={ handleOptionClick }
                                >
                                    { option.display }
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }, [defaultSelectOption, selectText, showOptionList, optionsList]);
}

export default Select;
