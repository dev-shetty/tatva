# Tatva

![Tatva Screenshot](https://tatva-country.vercel.app/og.png)

## Project Description

Tatva is a dynamic web application that allows users to explore countries worldwide interactively. Built with Next.js and powered by the [REST Countries](https://restcountries.com) API, Tatva offers a real-time search, region-based filtering, and an intuitive UI for a seamless user experience.

## Features

- **Real-time Search**: Filter countries as you type, with instant results.
- **Interactive Map**: View countries on an interactive map with additional details, using [leaflet.js](https://github.com/PaulLeCam/react-leaflet)
- **Country Details Modal**: Click on a country to view more detailed information, including the flag, capital, population, and more.
- **Guess the flag**: Improve your geography by playing this game, and flex among your friends. [Play here](https://tatva-country.vercel.app/guess-the-flag)

## Technology Stack

- **Frontend**:
  - **Next.js 14**: Chosen for its SSR capabilities, improved SEO, request caching, easy dynamic routing, and built-in loading states.
  - **Tailwind CSS**: Offers flexibility with colors and utility classes for rapid styling.
  - **ShadcnUI**: Provides common UI elements like input, button, and modal components, and integrates seamlessly with Tailwind CSS.
  - **TypeScript**: Catches errors during development, saving time on debugging runtime issues, and provides better API response suggestions.
  - **Lucide React**: Used for modern and customizable UI icons.
- **Tooling**:
  - **Bun**: Utilized for its fast runtime, efficient package management, and smooth build processes.
- **API**: [REST Countries API](https://restcountries.com)
- **API Testing:** Postman - [Tatva Workspace](https://elements.getpostman.com/redirect?entityId=24002822-c6434bbf-53aa-44da-bd2f-67c7949c09a4&entityType=collection)
- **Deployment**: Vercel

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/dev-shetty/tatva.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tatva
   ```

3. Copy `.env.example` to `.env.local`.

4. Install dependencies:

   ```bash
   bun install
   ```

5. Run the development server:

   ```bash
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

Tatva is deployed on Vercel and can be accessed at: [https://tatva-country.vercel.app/](https://tatva-country.vercel.app/)

## Potential Enhancements

- Leaderboard for different metrics like population, area, etc.
- Currency converter in `country` page to have realtime currency conversion of that country.
  - Can be implemented by using public apis for currency conversion.
- Compare different countries side-by-side like we have compare companies in Levels.fyi
- Users to mark countries as favourite
- Showcase country of the day in home page.
- Improve the game
  - Add option for retry and quit
  - Make public leaderboard.
  - Can have guess the capital, or guess the flag by country name mini-games.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [deveeshshetty@gmail.com](mailto:deveeshshetty@gmail.com).

---

Made with ❤️ by [Deveesh Shetty](https://github.com/dev-shetty)

Logo created using [LogoFast](https://shipfa.st/tools/logo-fast)
