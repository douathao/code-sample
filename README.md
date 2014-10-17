# Git

## Commit
git commit --amend
* undo commit
* git commit -m "m"; git add file; git commit --amend

## Log
log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
* use as an alias

git log -p -2
* shows diff in from last 2 commit

git log -U1 --word-diff

git log --stat -2

## Stash
git stash

git stash save "description"

git stash list

git stash show -p
* preview stash

git stash apply

git stash apply stash@{n}

git stash pop

## Remote
git push

git pull

git remote -v
* shows the remote url

git remote add [shortname] [url]

git fetch [remote|shortname|alias]
* fetch all information in the remote repo

git push [remote|shortname|alias] [branch]

git remote show origin
* more information about remote repo

git remote rename [name] [name2]
* rename remote

git remote rm [name]
* remove repo

## Tag
git tag -a v1.4 -m 'my version 1.4'

git show v1.4
* show all commit with tag

git tag -s v1.4 -m 'my signed 1.5 tag'
* signed tags (need private key)

git tag v1.4-lw
* create lightweight tags

git tag -v [tag-name]
* verifying tags

git tag -a v1.2 -m 'versoin 1.2' [checksum]
* tagging later with checksum commit

git push [remote|name] [tag name]
* sharing tags

git push origin --tags
* push all tags to remote

## Branch
git branch -v

git branch --merged
* see what branch has been merge to current (without * mean it is ave to delete)

git branch --no-merged
* see what branch haven't been merge

git branch -d

git branch -D
* force delete even if it is not fully merged back to master

## reflog
git reflog
* use to undo hard reset

