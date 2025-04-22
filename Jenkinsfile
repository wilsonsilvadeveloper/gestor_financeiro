pipeline {
  agent any

  tools {
    nodejs 'NodeJs'
  }

  environment {
    GIT_REPO = 'https://github.com/wilsonsilvadeveloper/gestor_financeiro.git'
  }

  stages {
    stage('Debug') {
      steps {
        echo 'Pipeline está rodando corretamente.'
      }
    }

    stage('Instalar Dependências') {
      steps {
        bat 'npm install'
      }
    }

    stage('Build do Projeto') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Merge para main') {
      when {
        branch 'development'
      }
      steps {
        sshagent (credentials: ['ssh-github']) {
          bat '''
            git config user.name "wilsonsilvadeveloper"
            git config user.email "wilsonoficial.com@gmail.com"
            git fetch origin
            git checkout main
            git merge origin/development --no-edit
            git push origin main
          '''
        }
      }
    }
  }
}
