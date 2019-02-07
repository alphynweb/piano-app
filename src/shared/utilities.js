import _ from 'underscore';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const generateKey = (pre) => {
    return pre.concat(new Date().getTime());
};

export const compareObjects = (obj1, obj2) => {
    return _.isEqual(obj1, obj2);
};