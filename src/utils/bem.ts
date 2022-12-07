export interface BEMWrapper {
    className: string;
    element: (element?: string, modifier?: string) => string;
    modifier: (modifier?: string) => string;
}

const BEMHelper: (cls: string) => BEMWrapper = (className: string) => ({
    className: className,
    element: (element?: string, modifier?: string) => `${className}__${element}${modifier ? ` ${className}__${element}--${modifier}` : ''}`,
    modifier: (modifier?: string) => `${className}--${modifier}`,
});

export default BEMHelper;
