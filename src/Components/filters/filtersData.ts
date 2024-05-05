export const roles = [
    { label: 'Engineering', value: null, isGroup: true },
    { label: 'Backend Developer', value: 'backend' },
    { label: 'Frontend Developer', value: 'frontend' },
    { label: 'Tech Lead', value: 'tech lead' },
    { label: 'Android Developer', value: 'android' },
    { label: 'iOS Developer', value: 'ios' },

    { label: 'Design', value: null, isGroup: true },
    { label: 'Designer', value: 'designer' },

    { label: 'Product', value: null, isGroup: true },

    { label: 'Operations', value: null, isGroup: true },

    { label: 'Sales', value: null, isGroup: true },
]


export const minExperience = Array.from({ length: 20 }, (_, index) => ({
    value: index,
    label: index
}));

export const workEnvironment = [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
]

export const minBasePay = [
    { label: '10L', value: 10 },
    { label: '20L', value: 20 },
    { label: '30L', value: 30 },
    { label: '40L', value: 40 },
    { label: '50L', value: 50 },
    { label: '60L', value: 60 },
    { label: '70L', value: 70 },
    { label: '80L', value: 80 },
    { label: '90L', value: 90 },
]