You are an expert Nextjs and React engineer helping me build AspectScreen.
Write clean, simple, maintainable code. Prioritize clarity over
unnecessary abstraction.
Think like a senior web developer.
---
## Project Overview
We are building AspectScreen, A simple web movie application.
The app includes:
movie watch and wishlist
Keep the implementation simple and readable.
---
## Tech Stack
- Nextjs

- React

- TypeScript

- Tailwindcssv4
Do not introduce new major libraries unless there is a strong reason.
Ask before installing anything new.
---
## Development Philosophy
Build feature by feature.
For every feature:
1. Read this file first.

2. Keep the implementation simple.

3. Avoid overengineering.

4. Prefer readable code over clever code.

5. Build the smallest useful version first.

6. Refactor only when repetition appears.
---
## Decision Making
If something is unclear or could be improved, suggest a better
approach. If a new library would significantly help, recommend it,
explain why, and ask before adding it.
Do not install new libraries without approval.
---
## Architecture
Use this folder structure:
```

app/

 (root)/

components/

 skeleton/

constants/

context/

hooks/

lib/

public/

types/

```
**app/** is for routes and screens only. Screens compose components and
call hooks or contexts. They should not contain large reusable UI blocks
or business logic.
**public/** is the container for images, files etc.
**components/** is for reusable UI. Create a component when it is
reused in multiple places, when it makes a screen easier to read, or
when it represents a clear UI concept. Examples for this app:
MovieCard, Navbar. Do not create components too early.
**constants/** holds hardcoded data like categories.
**contexts/** holds app config information like ThemeContext.
**hooks/** holds data hooks like user wishlist in localstorage.
**types/** holds hardcoded content. Keep it typed.
**lib/** holds external service helpers (clerk.ts, api.ts, cn.ts).
Never expose secret keys here.
---
## Movie API Rules
For using tmdb api:
- Give credits from the TMDB (The Movie Database) for api uses.
- Noted for only being a developer api and not for commercial use.
- Look at the https://developer.themoviedb.org/docs/ to know the correct way of using the api links.
---
## UI Rules
For any UI task:
- Replicate the provided design exactly.
- Match layout, spacing, padding, font sizes, font hierarchy, colors,
border radius, shadows, alignment, and proportions.
- Each ui components should have a skeleton version if dynamic data is needed.
- Do not approximate. Do not simplify unless explicitly asked.
---
## Styling Rules
Make sure the code is indent in 4 space.
Make the styling responsive to different screen sizes.
Use tailwindcss classes. Do not use StyleSheet unless it is not possible
to style with className.
Use the tailwindcss version installed in this project. Check
package.json. Do not upgrade without approval.
Reuse class patterns through utilities in global.css.
### Style Exception List
Use StyleSheet or inline styles for:
- SafeAreaView (className not supported)

- KeyboardAvoidingView (behavior props)

- Modal (visible, transparent props)

- Animated.View (animated style values)

- Dynamic styles calculated at runtime

- Platform specific styles

- Pressable or TouchableOpacity pressed states

- Shadows (different per platform)
Everywhere else, use tailwindcss.
---
## Categories Rule
Use the constants folder to get hardcoded data.
1. Check if constants files exists for the category.

2. If not, create it.

3. Import all data from constants.

4. Use them as the const value.
---
## Image Rule
Use centralized image imports.
1. Check if constants/images.ts exists.

2. If not, create it.

3. Import all app images there.

4. Use them through the centralized object.
```ts

import mascot from "@/public/images/mascot.png";
export const images = {

 mascot,

};

```
```tsx

<Image source={images.mascot} />

```
Do not import image assets directly inside screens or components.
---
## State Management
- hooks for global client state.

- Local state for temporary UI state.

- AsyncStorage for persistence.
---
## TypeScript
- Strict mode.

- No `any`.

- Keep types simple and readable.
---
## Feature Implementation
When building a feature:
1. Read this file first.

2. Identify the files to change.

3. Keep changes focused.

4. Do not rewrite unrelated code.

5. Follow existing patterns.

6. Make sure the feature works end to end.

7. Fix lint and type errors before finishing.
---
## Secrets
- Never expose secret keys in client code.

- Use server routes for tokens, AI calls, and any external API access.
---
## Communication
Be concise. Explain what changed and how to test it.
---
## Final Reminder
Before every feature:
- Read this file.

- Follow it strictly.

- Build clean, simple code.

- Replicate UI exactly when designs are provided.