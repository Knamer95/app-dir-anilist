`v1.0.0 - 2023-09-24`

# Separation between server and client exports

The @/anilist-api folder exports should separate server and client parts.

If, for example, @/anilist-api/anime exported everything, and we used something from it in a RSC, that would make the rest not usable for client side components, even if not using the same function.

For example:

```ts
// Server-side component
import { getAnimes } from '@/anilist-api/anime';

const RSC = async () => {
    const anime = getAnimes();

    return <></>;
};
```

```ts
// Client-side component
import { useQAnimes } from '@/anilist-api/anime';

const CSC = async () => {
    const { data: anime } = useQAnimes();

    return <></>;
};
```

This will not work, and Next.js will complain.
