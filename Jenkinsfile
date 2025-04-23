pipeline {
  agent any

  tools {
    nodejs 'NodeJs'
  }

  environment {
    GIT_REPO = 'https://github.com/wilsonsilvadeveloper/gestor_financeiro.git'
    NEXT_DISABLE_SWC_NATIVE = 'true'
    SHARP_IGNORE_GLOBAL_LIBVIPS = 'true'
  }

  stages {
    stage('Debug') {
      steps {
        bat '''
          echo Pipeline está rodando corretamente.
          where node
          node -v
          npm -v
          node -p "process.arch"
          node -p "process.platform"
        '''
      }
    }

    stage('Build do Projeto') {
      steps {
        bat 'rd /s /q node_modules'
        bat 'del /f /q package-lock.json'
        bat 'npm cache clean --force'
        bat 'npm install --timeout=60000'
        bat 'npm rebuild'
        bat 'npm run build'
      }
    }

    stage('Verificar Branch') {
      steps {
        bat 'git rev-parse --abbrev-ref HEAD'
      }
    }

    stage('Merge para main') {
      when {
        branch 'development'
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'token_git', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
          bat '''
            git config user.name "wilsonsilvadeveloper"
            git config user.email "wilsonoficial.com@gmail.com"
            git remote set-url origin https://%GIT_USER%:%GIT_TOKEN%@github.com/wilsonsilvadeveloper/gestor_financeiro.git
            git stash --include-untracked
            git fetch origin
            git checkout -B main origin/main || git checkout -b main
            git fetch origin development
            git merge origin/development --no-edit
            git push origin main
            git stash pop || true
            '''
        }
      }
    }
  }
}
