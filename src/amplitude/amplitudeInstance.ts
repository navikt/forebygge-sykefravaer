import amplitude from 'amplitude-js';

const enum AmplitudeBucket {
    ARBEIDSGIVER_PROD = 'a8243d37808422b4c768d31c88a22ef4',
    ARBEIDSGIVER_DEV = '6ed1f00aabc6ced4fd6fcb7fcdc01b30',
}

const getBucketId = () => {
    return window.location.hostname === 'arbeidsgiver.nav.no'
        ? AmplitudeBucket.ARBEIDSGIVER_PROD
        : AmplitudeBucket.ARBEIDSGIVER_DEV;
};

const amplitudeInstance = amplitude.getInstance();

amplitudeInstance.init(getBucketId(), '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
});

export default amplitudeInstance;
