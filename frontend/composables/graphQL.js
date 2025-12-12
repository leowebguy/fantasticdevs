import { useRuntimeConfig } from '#app';

export const graphQL = async (query, variables = {}, options = {}) => {
    const config = useRuntimeConfig();

    try {
        if (!config.public.NUXT_CRAFT_URL)
            throw new Error('NUXT_CRAFT_URL is not set');

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        // Add auth header if private flag is true
        if (options.private)
            headers['Authorization'] = `Bearer ${config.public.NUXT_GRAPHQL_TOKEN}`;

        // Add token header if preview flag is true
        if (options.previewToken)
            headers['X-Craft-Token'] = options.previewToken;

        const response = await fetch(`${config.public.NUXT_CRAFT_URL}/api`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                variables
            }),
            credentials: 'include'
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        if (!result || typeof result !== 'object')
            throw new Error('Invalid response format');

        if (result.errors)
            throw new Error(result.errors[0]?.message || 'GraphQL error');

        return result.data;

    } catch (err) {
        console.error('GraphQL Error:', {
            message: err.message,
            query,
            variables
        });

        if (process.env.NODE_ENV === 'development')
            throw err;
    }
};
