---
layout: post
title: "Markdown heaven: Mapping the § key to # on a macOS British keyboard"
tags: apple macOS bear
---

I've been spending more time in [Bear](https://bear.app/) recently, migrating my old DayOne journal entries into a more portable system... and I've been doing a lot of headings and tagging which means I've been hitting that **#** symbol a lot.

On a macOS British keyboard layout this requires the `option + 3` key combination, which requires a little keyboard gymnastics and interrupts my flow. Wouldn't it be better if there was a simple keystroke for this? Looking at the keyboard, I can't say that I've ever had cause to use the  `§/±` key at the top left of my British keyboard. It'd be perfect if I could remap this to `#`.
<!-- more -->

## The journey
After some searching, I discovered the `hidutil`  in an [Apple Tech Note](https://developer.apple.com/library/archive/technotes/tn2450/_index.html) that allows native keyboard remapping, but after some trial and error this only seems to allow mapping of single keys and not key combinations.

The next option I discovered was a free utility called [Karabiner-Elements](https://karabiner-elements.pqrs.org). This looked legitimate enough so I downloaded it to try it out. The [installation process](https://karabiner-elements.pqrs.org/docs/getting-started/installation/) requires permission to allow it to run in the background and more alarmingly to monitor all keyboard input. I've nothing against the developers of this tool and I'm sure it's probably fine but giving that level of permission doesn't sit well with me and could present a security risk. So, that was a no go.

The final stop on this journey was with [Ukelele](https://software.sil.org/ukelele/), a tool I'd seen mentioned on a couple of other posts but which suggested it was no longer maintained. Thankfully this build provided by SIL has been kept up to date. Again, there is an inherent risk to downloading an unsigned application, but the difference here is that it's just a configuration tool that generates an XML keyboard layout file and isn't required to run in the background to remap the keys. 

To cut a long story short, I followed a couple of simple steps and created a new British Markdown keyboard bundle that's identical to the standard layout except for swapping out the `§` symbol for`#`. This produced a simple `British markdown.bundle` file, provided as a zip file for your convenience below. After unzipping, if you wish you can right-click to choose _Show Package Contents_ and check it's nothing more than a few text files and an icon.

[British Markdown.bundle](/uploads/2024/british-markdown.zip) (zip)


## Installation and setup
First open **Finder**, click on the **Go** menu whilst holding down the **option** key to reveal the **Library** and drop the file into `Library/Keyboard Layouts` folder.

![Library / Keyboard Layouts](/uploads/2024/library-keyboard-layouts.jpg)
*Library / Keyboard Layouts folder*

To enable this layout, open **System Settings** and go to **Keyboard > Text Input** and click the Edit button on **Input Sources**. On the modal window, click the **+** at the bottom left to add a new layout. Under English you should see the **British Markdown** bundle.

Add this and make sure **Show input menu in menu bar** is enabled. You should now be able to choose between your standard British keyboard and the modified one.

![System Settings > Keyboard Input Sources](/uploads/2024/system-settings-keyboard.jpg)
*System Settings > Keyboard Input Sources*

## Conclusion
This makes writing markdown a lot more fluid. I just need to retrain my muscle memory now to use the new key rather than the old key combination. Unfortunately it's only a macOS solution. I'd like to find a way to replicate this on iPadOS too.

## Troubleshooting
If the keyboard layout doesn't appear, you may need to restart or check in the Other section at the bottom of the Languages menu.
