---
layout: post
title: "Say goodbye Apple Notes' eye-watering yellow links"
tags: apple 'apple notes'
---

### Despite still using [Evernote](https://evernote.com/) as my [Second Brain](https://www.buildingasecondbrain.com/), I still use Apple Notes on occasion. While it’s gained more features over the years, one thing that really irritates me is the lack of simple customisation, especially the awful yellow colour of links.

![Apple Notes with yellow hyperlinks](/uploads/2024/macos-apple-notes-yellow.png)

Perhaps it’s just me and my [colour blindness](https://enchroma.com/pages/color-blindness-test#test) but it does seem an odd choice. You’d think that someone at Apple would notice it’s really bad, or at least provide an obvious way to change it across all platforms. There are ways, but it’s not as straightforward as it should be.

## macOS

Turns out the colour on macOS is linked to the system wide Accent colour. To change it, you need to go to **System Settings > Appearance** and then change the **Accent colour**.

![Change the Accent and Highlight colours](/uploads/2024/macos-appearance.png)
*Change the Accent and Highlight colours*

I've altered the Accent colour to Blue. Also note that this changes the Highlight colour by default. I've set mine to Yellow. It's a universal rule, links are blue, highlighter pens are yellow. That's the way it's supposed to be.

![Apple Notes now with blue hyperlinks](/uploads/2024/macos-apple-notes-blue.png)
*Much Better!*

## iPadOS and iOS
On the mobile OS it’s not possible to change the colour completely, but it can be improved with an Accessibility feature. This works the same for both iOS and iPadOS. **Settings > Accessibility**, scroll to the bottom and select **Per-App Settings**. Select **Add App** and search for **Notes**. You’ll want to turn **Increase Contrast** to **On**.

![Apple Notes on iOS showing improved contrast of links](/uploads/2024/ios-accessibility.png)
*Once you change it, the original setting just looks wrong*

## Is it just me?
For anyone who is interested, I picked out the text and background colours and ran them through the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/?fcolor=E4AF0E&bcolor=FFFFFF) and, of course, it fails with a contrast ratio of ~2:1. The fix on iOS does [improve this number](https://webaim.org/resources/contrastchecker/?fcolor=B68C08&bcolor=FFFFFF) to ~3:1, but still reports as a failure. Here’s hoping this gets better in a future release.

![WebAIM Contrast Checker results](/uploads/2024/contrast-checker.png)
*Screen capture of the WebAIM Contrast Checker*
