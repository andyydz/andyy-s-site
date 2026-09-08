# Professional SOC Portfolio Refinement

## Goal
Polish the current one-page cybersecurity portfolio without changing its identity, factual content, links, data, or working features. Keep the dark Linux terminal aesthetic, green/amber status language, monospace headings, profile image, stats, projects, certifications, experience, contact form, social links, and QR code.

## What will change

### Navigation and hero
- Improve header spacing, mobile menu clarity, 44px touch targets, and active-section feedback while preserving all anchors and the resume action.
- Strengthen the hierarchy between Andrew’s name, “Andyy,” role, supporting line, and CTA row.
- Integrate the profile image as a cleaner terminal identity panel with restrained status details.
- Keep Resume, Contact, GitHub, and LinkedIn behavior unchanged and sourced from the existing profile data.

### Evidence and content sections
- Present TryHackMe and GitHub numbers as labeled profile evidence rather than disconnected counters.
- Improve About readability with a comfortable measure and subtle terminal framing.
- Keep the three expandable skill categories, but make each category independently expandable and give tags clearer spacing and contrast.
- Rework featured project presentation into recruiter-scannable case files with clear Problem, Approach, Outcome, and Next sections; retain every existing word and repository link.
- Improve supporting project cards, certification status, experience, volunteering, and recommendation hierarchy without adding claims or changing dates.

### Contact and footer
- Improve form labels, field states, validation visibility, sending state, and control sizing while preserving submission behavior.
- Make contact links easier to identify and preserve all exact destinations.
- Refine footer alignment and hierarchy while keeping the QR code, watermark, copyright, and all social links.

### Responsive and accessibility review
- Test at 375px mobile, tablet portrait/landscape, laptop, and desktop widths.
- Prevent fixed navigation from obscuring content, ensure readable wrapping, stable card layouts, keyboard focus, smooth anchors, and reduced-motion behavior.
- Keep the existing semantic H1/H2/H3 structure, image alternatives, homepage metadata, canonical URL, structured data, robots rules, and sitemap intact.

## Technical approach
- Work within the existing React section components, navigation, hero, shared tokens, and profile data source.
- Add only semantic design tokens and reusable presentation utilities needed for the refinement.
- Do not add packages, routes, backend changes, analytics, invented content, or unrelated functionality.
- Verify the final live output and interactions with browser checks, including all external links and the mobile menu.
