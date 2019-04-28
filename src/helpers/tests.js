export const findByTestAttr = (node, attrName) => node.find(`[data-test="${attrName}"]`);
export const findAllByTestAttr = (node, attrName) => node.findAll(`[data-test="${attrName}"]`);
