export const getMarginStyles = (margin: number | object | string | undefined = {}) => {
    const { m, mt, mb, ml, mr, mh, mv }: any = margin || {};
    return {
        ...(m != null && { margin: m }),
        ...(mt != null && { marginTop: mt }),
        ...(mb != null && { marginBottom: mb }),
        ...(ml != null && { marginLeft: ml }),
        ...(mr != null && { marginRight: mr }),
        ...(mh != null && { marginHorizontal: mh }),
        ...(mv != null && { marginVertical: mv }),
    };
};

export const getPaddingStyles = (padding: number | object | string | undefined = {}) => {
    const { p, pt, pb, pl, pr, ph, pv }: any = padding || {};
    return {
        ...(p != null && { padding: p }),
        ...(pt != null && { paddingTop: pt }),
        ...(pb != null && { paddingBottom: pb }),
        ...(pl != null && { paddingLeft: pl }),
        ...(pr != null && { paddingRight: pr }),
        ...(ph != null && { paddingHorizontal: ph }),
        ...(pv != null && { paddingVertical: pv }),
    };
};