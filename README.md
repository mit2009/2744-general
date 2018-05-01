# 2744-general
Mostly for the matrix slideshow

## Google Drive

I used Google Sheets for creation of most commands. You can create columns for each of the various arguments or pieces you'll need, and then stitch them together with `CONCATENATE`.

### CONCATENATE

For example, I could `ls -al` a folder of images of random sizes to get their names, use regex find/replace in sublime text to extract just the filenames, and paste that into column A of a google sheet. I'd extract just the usernames (again, regex replace in sublime text), and put those in column B. Then, on another column, I would have something like `=CONCATENATE("convert ", A1, " -resize 582x582 display/",B1,".png")`, and drag that down to convert everything to display size.

### VLOOKUP

Another useful one is VLOOKUP. Suppose that you have a column of people with their assigned color, and another column elsewhere of people, but with random people missing that skipped class that day. How do you look up what color they had? VLOOKUP.

`=VLOOKUP(M6,$I$2:$J$84,2, FALSE)`

Here, `M6` is the username to look up, the table to look in is in columns I and J, from 2-84, with usernames in I, and colors in J. `2` indicates to look in the second column of the 2 for what to return, and `FALSE` said that `I` is not sorted.

## Regex basics

You should really just play around with regex, but in sublime text, some useful ones are capture groups (parentheses are roughly capture groups, but you should Google around for tutorials if you're not familiar). For example, if you have

`-rw-r--r--   1 lcarter  staff   509196 May  1 11:13 username.png`

You could extract the filename by finding

`.+ (.+)`

And replacing it with `$1`. (`$2` would be the second capture group and so on).

In sublime, open find+replace by Cmd+Option on mac, or Ctrl+H on any other system.


## Useful shell commands

Hopefully you already know the basics (`mv`, `cp`, piping, etc). These are some slightly less common commands that are useful for 2.744.

### Convert

Convert is a CLI for ImageMagick. I think it's installed on Macs by default. Here's how I usually used it for 2.744:

`convert -resize 582x582 username.jpeg display/username.png` (note that it automatically can convert between different formats. I usually converted to all png or all jpg). The default behavior is to scale with the same ratio so that neither of the numbers you typed get exceed (eg, longest edge 582px in this case).

It can also convert pdfs to pngs:

`convert -density 150 username.pdf -append -quality 90 username.png` (this doesn't resize things, that was done separately).

### File

File is useful for programmatically figuring out if things are landscape or horizontal.

`file *` in a directory of images produces lines like this:

`username.png: PNG image data, 2326 x 2889, 8-bit/color RGBA, non-interlaced`

You can then compare the two dimensions to see which is larger. It's width x height. Usually I would run the resizing script and then replace ... x 93 by P_ and 93 x ... with L_, and write a separate script to rename things because that was a bit easier to conceptualize.

### Find

Find is useful when people upload folders of poorly-formatted files.

`find . -name \*.jpg -print` will print all `.jpg`'s from subfolders of your current folder. Repeat that for `.png` and `.jpeg` and you'll probably cover most of the image files people use. `-name` is not case-sensitive, but `-iname` is, in case you need that for whatever reason.