import mixpanel from 'mixpanel-browser';

if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
	throw new Error('MIXPANEL_TOKEN is not defined');
}

mixpanel.init(
	process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
	{
		debug: false,
		track_pageview: true,
		persistence: 'localStorage',
		ignore_dnt: true,
	},
);

export default mixpanel;
