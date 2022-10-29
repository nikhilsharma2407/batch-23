Initialise repo 
git init

Check status - git status

remove file froom staging - git reset filename

git commit -m " MESSAGE "

undo latest commit -  git reset head^ 
undo last n commits -  git reset head~n 

git reset <hash> - removes commit and any history as well

git revert <hash> - creates a new commit undoing the changes (preserves history)





git checkout -b <branchName> create a new branch from the current branch

checkout to change <branchName> -  git checkout <branchName> 


clone repo - git clone <url>