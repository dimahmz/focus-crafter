git status
git commit -m "$2"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
git push -u origin $1